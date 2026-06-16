# Prompts.md — The Registration Wizard

> Documents every AI interaction during this project.

---

## Day 1 — June 14

### Setting up

Did the Vite setup myself — been doing this since Sprint 04, no help needed. Created the folder structure, planned the components: App, ProgressBar, FormField, StepPersonal, StepAccount, StepReview, SuccessScreen.

Decided to name the step navigation functions `goNext` and `goBack` instead of `handleNext`/`handleBack` — shorter and more honest about what they do.

---

### Problem 1 — Back button was wiping Step 1 data

Built StepPersonal with its own `useState` for firstName, lastName, dateOfBirth. Typed my name, clicked Next to Step 2, clicked Back — completely blank.

Added a `console.log` inside StepPersonal's render to debug. It only fired once — not when I navigated back. That told me the component wasn't re-rendering, it was being recreated from scratch.

**What I asked Claude:**
> "I have a React form using conditional rendering like `{step === 1 && <StepPersonal/>}`. When I go back to step 1 the useState data is gone. Why?"

**What it explained:**
Conditional rendering with `&&` doesn't hide the component — it unmounts it. When step becomes 2, React destroys StepPersonal completely. When step goes back to 1, it creates a brand new one with fresh state. Fix: lift the state up to App.jsx which never unmounts, pass it down as props.

**What I wrote after understanding this:**

```js
// App.jsx
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function updateFormData(newFields) {
  setFormData(prev => ({ ...prev, ...newFields }))
}
```

Each step gets `formData` and `updateFormData` as props. Steps keep local state for smooth typing, then push up to parent via `useEffect` whenever local changes.

---

## Day 2 — June 15

### Problem 2 — Errors showing before user types anything

Added my validation logic. Page loaded and immediately showed red error borders on all three fields. User hadn't touched anything.

**What I asked Claude:**
> "How do I only show validation errors after the user has interacted with a field?"

**What it explained:**
Track which fields are "touched" in a separate state object. Set the field to true in the onChange handler. Only display an error if that field's touched value is true.

**What I built:**

```js
const [touched, setTouched] = useState({})

function handleChange(field, value) {
  setLocal(prev => ({ ...prev, [field]: value }))
  setTouched(prev => ({ ...prev, [field]: true }))
}

// in JSX
error={touched.firstName ? errors.firstName : ''}
```

I decided to keep the validation inline instead of in a separate `validate()` function — felt more readable to me while writing it:

```js
const errors = {}
if (local.firstName.trim().length < 2) {
  errors.firstName = 'First name must be at least 2 characters'
}
// etc.
```

---

### Problem 3 — Understanding the email regex

Sprint FAQ gave this regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
Didn't want to paste it without knowing what it does.

**What I asked Claude:**
> "Break down this regex character by character: `^[^\s@]+@[^\s@]+\.[^\s@]+$`"

**What it explained:**

| Part | Meaning |
|---|---|
| `^` | start of string |
| `[^\s@]+` | one or more chars that are NOT whitespace and NOT @ |
| `@` | literal @ |
| `[^\s@]+` | domain name |
| `\.` | literal dot (escaped — unescaped means "any char") |
| `[^\s@]+$` | domain extension, end of string |

Now I actually understand it. Used `.test()` because it returns a boolean.

```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!EMAIL_REGEX.test(local.email)) {
  errors.email = 'Enter a valid email — needs an @ symbol'
}
```

---

### Problem 4 — Show/hide password toggle

**What I asked Claude:**
> "How do I make a show/hide password toggle where the icon is inside the input field visually?"

**What it explained:**
Boolean state controls the input's `type` attribute. Position the button inside the input wrapper using flexbox.

```js
const [showPassword, setShowPassword] = useState(false)
// input type
type={showPassword ? 'text' : 'password'}
// button
onClick={() => setShowPassword(s => !s)}
```

Originally Claude suggested making a separate `EyeToggle` component. I decided against it — the toggle is only used in StepAccount so it felt like unnecessary abstraction. I just wrote the button inline:

```jsx
suffix={
  <button type="button" className="eye-toggle" onClick={() => setShowPassword(s => !s)}>
    {showPassword ? '🙈' : '👁'}
  </button>
}
```

Two separate states — `showPassword` and `showConfirm` — so toggling one doesn't affect the other.

---

## Day 3 — June 16

### Problem 5 — Progress bar connecting line

Wanted a line between step dots that fills as you advance.

**What I asked Claude:**
> "How do I build a multi-step progress bar with a filling connecting line in CSS?"

**What it explained:**
Stack two elements — a full-width grey track and a filled div on top, both `position: absolute`. The dots sit above in a flex container with `position: relative` and higher `z-index`. Width of the fill is driven by a percentage.

```js
const fillPercent = ((currentStep - 1) / (totalSteps - 1)) * 100
// step 1 = 0%, step 2 = 50%, step 3 = 100%
```

I chose the variable name `fillPercent` instead of `pct` — more obvious when reading the code later.

---
