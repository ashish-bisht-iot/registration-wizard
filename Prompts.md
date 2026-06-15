# Prompts.md — The Registration Wizard

> This file documents every AI interaction I had during the Registration Wizard — what I was stuck on, what I asked, what the AI explained, and what I wrote myself afterward.

---

## Day 1 — June 14

### Getting oriented

Read the sprint brief. The core challenge was clear immediately: a multi-step form where data has to survive when you switch between steps. In React, components unmount when conditionally hidden — so if I store data inside a step component, that data gets wiped when I navigate away.

Set up the Vite project from scratch. I've done this enough now that it's muscle memory — `npm create vite@latest`, React template, delete boilerplate, set up my folder structure. No AI needed for setup.

---

### Session 1 — Why does clicking Back wipe my Step 1 data?

**What I was doing:** I built StepPersonal and StepAccount as two separate components, each with their own `useState` for the input fields. I used `{step === 1 && <StepPersonal/>}` in App.jsx to show/hide them.

**The bug:** Typed my name in Step 1, clicked Next, clicked Back. Step 1 was completely blank. I added a `console.log` inside StepPersonal's render — it only fired once, not when I navigated back. That told me the component wasn't re-rendering, it was re-*mounting*.

**What I asked Claude:**
> "I have a multi-step React form using conditional rendering like `{step === 1 && <StepOne/>}`. When I navigate back to Step 1, all the useState data is gone. Why is this happening?"

**What Claude explained:**
Conditional rendering with `&&` doesn't hide a component — it unmounts it. When `step` becomes 2, React completely destroys `<StepOne/>` and removes it from the tree. When `step` goes back to 1, React creates a brand new `<StepOne/>` with fresh initial state — like it's running for the first time.

The fix is "lifting state up." Move the form data out of the step components and into the parent `App` component, which never unmounts. Pass the data and a setter down to the steps as props.

**What I wrote myself after understanding this:**

```js
// App.jsx — one object to hold all form data
const [formData, setFormData] = useState({
  firstName: '', lastName: '', dateOfBirth: '',
  email: '', password: '', confirmPassword: ''
})

function updateFormData(fields) {
  setFormData(prev => ({ ...prev, ...fields }))
}
```

I used a spread merge (`{ ...prev, ...fields }`) so each step can update only its own fields without knowing about the other steps' data. Each step gets `formData` and `updateFormData` as props. Steps keep their own local state for smooth typing, then call `updateFormData` inside a `useEffect` whenever local state changes.

---

## Day 2 — June 15

### Session 2 — Validation errors showing on blank page load

**What happened:** Added validation to Step 1. First name must be at least 2 chars. The moment the page loaded, both name fields showed red error borders. The user hadn't touched anything yet.

**What I asked Claude:**
> "My validation errors show immediately when the component mounts, before the user has typed anything. How do I only show errors after the user has interacted with a field?"

**What Claude explained:**
This is called the "touched" pattern. Keep a separate state object that tracks which fields have been interacted with. Only render an error message if that field's `touched` value is true. Set it to true inside the `onChange` handler.

```js
const [touched, setTouched] = useState({})

function handleChange(field, value) {
  setLocal(prev => ({ ...prev, [field]: value }))
  setTouched(prev => ({ ...prev, [field]: true }))
}

// In JSX — gate display behind touched check
<FormField error={touched.firstName ? errors.firstName : ''} />
```

**What I built myself:** Applied this in both StepPersonal and StepAccount. The validate function itself always runs on every render (so `isValid` is always accurate for the button's disabled state). But `touched` gates whether the error actually appears visually. Clean separation.

---

### Session 3 — Understanding the email regex

**What I was doing:** The sprint FAQ provides the regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` and says to use it. I didn't want to just paste it without knowing what it does.

**What I asked Claude:**
> "Can you break down this regex character by character: `^[^\s@]+@[^\s@]+\.[^\s@]+$`"

**What Claude explained:**

| Part | Meaning |
|---|---|
| `^` | Start of the string |
| `[^\s@]+` | One or more characters that are NOT whitespace and NOT @ |
| `@` | Literal @ symbol |
| `[^\s@]+` | Domain name — chars that aren't whitespace or @ |
| `\.` | Literal dot (backslash escapes it, otherwise `.` means "any char") |
| `[^\s@]+` | Domain extension (com, in, io, etc.) |
| `$` | End of the string |

So it reads: something@something.something — no spaces allowed anywhere.

**What I wrote:**
```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Inside validate():
if (!EMAIL_REGEX.test(data.email)) {
  errors.email = 'Please enter a valid email address (must contain @).'
}
```

Used `.test()` because it returns a boolean — perfect for validation.

---

### Session 4 — Show/Hide password toggle

**What I wanted:** An eye icon inside the password input that reveals/hides the text when clicked.

**What I asked Claude:**
> "How do I build a show/hide password toggle in React where the icon sits visually inside the input field?"

**What Claude explained:**
Two things: (1) a boolean state drives the input's `type` attribute, and (2) you position the icon inside the field wrapper using flexbox.

```js
const [showPassword, setShowPassword] = useState(false)

// Input
<input type={showPassword ? 'text' : 'password'} ... />

// Toggle button
<button type="button" onClick={() => setShowPassword(s => !s)}>
  {showPassword ? '🙈' : '👁'}
</button>
```

**What I built myself:** I made `FormField.jsx` accept an optional `suffix` prop — any React node that renders inside the field's wrapper div on the right side. Then in `StepAccount.jsx` I created a small `EyeToggle` button component (kept it in the same file since it's only used there) and passed it as the suffix. Two separate boolean states — one for password, one for confirm password — so toggling one doesn't affect the other.

---

### Fixed on my own — Page reloading on button click

**What happened:** Wrapped fields in a `<form>` tag initially. Clicking Next refreshed the entire page and wiped all state.

Already knew this from Sprint 06. Buttons inside `<form>` default to `type="submit"` which triggers a browser POST. I removed the `<form>` tags entirely and used plain `<div>` wrappers. All buttons now have explicit `type="button"`.

No AI needed — just remembered the lesson.

---

### Fixed on my own — Confirm password edge case

**The scenario:** User types password "mypassword123", types matching confirm, then goes back and changes the main password to something else. Does the confirm field update its error?

Checked my code. My `validate(local)` runs fresh on every render and uses the current `local.password` and `local.confirmPassword` values. When main password changes, `local` updates, the component re-renders, `validate` runs again, and the mismatch is caught immediately. No special handling needed — the architecture handles it automatically.

---

## Day 3 — June 16

### Session 5 — Progress bar layout with connecting line

**What I wanted:** Step indicators with a line connecting them, where the line fills up as you advance through steps.

**What I asked Claude:**
> "What's the CSS approach for a multi-step progress bar where there's a line connecting the step dots that fills progressively?"

**What Claude explained:**
Layer two elements:
1. A `position: absolute` div for the full track line (sits behind everything)
2. A separate `position: absolute` div for the filled portion, with `width` driven by a percentage

Put the dots in a `position: relative` flex container with `z-index` above the track.

```
fill width = ((currentStep - 1) / (totalSteps - 1)) * 100 + '%'
```

**What I built myself:** Set up the container as `position: relative`. The track line spans `left: 14px` to `right: 14px` (accounting for half a dot width on each side). The fill div gets `style={{ width: pct + '%' }}` as an inline style and a CSS transition for the animation. Added a `@keyframes` pulse on the active dot's box-shadow — gives a subtle breathing effect that makes the current step obvious without being loud.

---

### Fixed on my own — Password strength bar jumping instead of animating

**The bug:** The strength bar showed correct values but changed abruptly instead of smoothly transitioning between widths.

Inspected in DevTools. I had `transition: width 0.3s ease` on `.strength-fill` which was right. Found the issue: there was an extra wrapper `<div>` between the track and the fill element that didn't have explicit dimensions, causing the fill to recalculate its percentage basis on each change. Removed the extra wrapper. Smooth transitions immediately.
