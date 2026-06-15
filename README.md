# 🧙‍♂️ Sprint 07 — The Registration Wizard

> **Sprint 07 | Phase 3: Core Engineering | Prodesk IT Internship**

A multi-step onboarding wizard built in React + Vite. The kind of segmented, validated, state-persistent form you find in real SaaS and FinTech products — not a 20-field wall of inputs.

<br/>

| | |
|---|---|
| 🔗 **Live Demo** | [sprint07.vercel.app](https://your-link-here.vercel.app) |
| 📁 **Repository** | [github.com/ashish-bisht-iot/sprint07](https://github.com/ashish-bisht-iot/sprint07) |
| 🎥 **Demo Video** | [3-minute walkthrough](https://your-video-link-here) |
| 🗓 **Sprint** | June 12 – June 18, 2025 |

<br/>

---

## 📸 Screenshots

### Step 1 — Personal Information

> First name, last name, date of birth. The **Continue** button stays disabled until both name fields have at least 2 characters and a date is selected.

![Step 1 — Personal Info](./screenshots/step1-personal-info.png)

---

### Step 1 — Validation Errors

> Error messages only appear after the user has interacted with a field ("touched" state pattern). Empty form on load = no red errors.

![Step 1 — Validation](./screenshots/step1-validation.png)

---

### Step 2 — Account Details

> Email with regex validation, password with real-time strength meter, confirm password match check. Show/hide toggles on both password fields.

![Step 2 — Account Details](./screenshots/step2-account.png)

---

### Step 2 — Real-Time Error Messages

> Email error fires as soon as the format is wrong (missing @). Password strength meter updates on every keystroke. Confirm password mismatch shows immediately.

![Step 2 — Errors](./screenshots/step2-errors.png)

---

### Step 2 — Password Visible (Show/Hide Toggle)

> Eye icon toggles the input between `type="password"` and `type="text"`. Separate toggle for each password field — toggling one doesn't affect the other.

![Step 2 — Show Password](./screenshots/step2-show-password.png)

---

### Step 3 — Review & Submit

> Summary of all collected data before final submission. Password is masked with bullet characters (●). Back button still works here — data is preserved.

![Step 3 — Review](./screenshots/step3-review.png)

---

### Back Button — State Preserved ✅

> This is the core feature of the sprint. Filled in Step 1 → navigated to Step 2 → clicked Back → **Step 1 data is still there.** This works because of lifted state.

![Back Button — Data Preserved](./screenshots/back-button-state.png)

---

### Success Screen

> Clicking Submit transitions to the success screen. The finalized payload is simultaneously logged to the browser console.

![Success Screen](./screenshots/success-screen.png)

---

### Console Output — Finalized Payload

> `console.log(formData)` on submit shows the full registration object. In a real app, this would be a POST request to an API.

![Console Log](./screenshots/console-log.png)

---

## ✅ Sprint Requirements Checklist

### Phase 1 — Base MVP (P0 — Mandatory)

| Requirement | Status |
|---|---|
| 3 distinct views via conditional rendering | ✅ |
| Step 1: Personal Info (First Name, Last Name, DOB) | ✅ |
| Step 2: Account Details (Email, Password, Confirm) | ✅ |
| Step 3: Review — renders summary of all captured data | ✅ |
| Next and Back navigation between steps | ✅ |
| Lifted state — data persists when navigating Back | ✅ |
| Submit logs `formData` to console | ✅ |
| Submit triggers success UI state | ✅ |

### Phase 2 — UX Polish (P1)

| Requirement | Status |
|---|---|
| Real-time `onChange` validation (not on submit) | ✅ |
| Email: error if no `@` symbol | ✅ |
| Password: minimum 8 characters | ✅ |
| Confirm Password: must match exactly | ✅ |
| "Next" disabled until all current-step fields are valid | ✅ |
| Show/Hide password toggle (eye icon) | ✅ |
| Progress indicator ("Step X of 3") | ✅ |

---

## 🏗️ How It's Built

### The Core Problem: State Across Steps

React's conditional rendering (`{step === 1 && <StepPersonal/>}`) doesn't *hide* a component — it *unmounts* it. When `step` changes to 2, `StepPersonal` is destroyed and its local state is gone. When you navigate back to step 1, React creates a brand-new `StepPersonal` with fresh initial values.

**Solution: Lift State Up**

Move all form data into `App.jsx`, which never unmounts:

```jsx
// App.jsx
const [formData, setFormData] = useState({
  firstName: '', lastName: '', dateOfBirth: '',
  email: '', password: '', confirmPassword: ''
})

function updateFormData(fields) {
  // Spread merge — each step only updates its own fields
  setFormData(prev => ({ ...prev, ...fields }))
}
```

Each step receives `formData` and `updateFormData` as props. Steps keep their own local state for smooth typing, and sync to the parent via `useEffect`:

```jsx
// Inside StepPersonal.jsx
const [local, setLocal] = useState({
  firstName: formData.firstName,
  lastName:  formData.lastName,
  dateOfBirth: formData.dateOfBirth,
})

// Whenever local changes, push it up to App
useEffect(() => {
  updateFormData(local)
}, [local])
```

---

### onChange Validation + Touched State

Two separate concerns — don't mix them:

1. **Validation runs on every render** — keeps `isValid` accurate for button disabling
2. **Errors only display after the field is touched** — no red errors on a blank form

```jsx
const [touched, setTouched] = useState({})

function handleChange(field, value) {
  setLocal(prev => ({ ...prev, [field]: value }))
  setTouched(prev => ({ ...prev, [field]: true }))  // mark as touched
}

// Validate always
const errors  = validate(local)
const isValid = Object.keys(errors).length === 0

// Display only if touched
<FormField
  error={touched.email ? errors.email : ''}
/>
```

---

### Email Regex

```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

Breakdown:
- `^` — start of string
- `[^\s@]+` — one or more chars that are NOT whitespace and NOT @
- `@` — literal @ symbol
- `[^\s@]+` — domain name
- `\.` — literal dot (escaped — unescaped `.` means "any character")
- `[^\s@]+$` — domain extension, end of string

---

### Conditional Button Disabling

```jsx
const errors  = validate(local)
const isValid = Object.keys(errors).length === 0

<button
  type="button"
  disabled={!isValid}
  onClick={onNext}
>
  Continue →
</button>
```

React re-evaluates `isValid` on every state change. Button becomes enabled the instant all fields pass validation.

---

### Show/Hide Password

```jsx
const [showPassword, setShowPassword] = useState(false)

<input
  type={showPassword ? 'text' : 'password'}
  value={local.password}
  onChange={e => handleChange('password', e.target.value)}
/>
<button type="button" onClick={() => setShowPassword(s => !s)}>
  {showPassword ? '🙈' : '👁'}
</button>
```

Separate `showConfirm` state for the confirm password field — independent toggles.

---

## 📁 Project Structure

```
sprint07/
├── index.html
├── vite.config.js
├── package.json
├── Prompts.md                      ← AI debugging log (required)
├── README.md                       ← this file
└── src/
    ├── main.jsx                    ← React entry point
    ├── App.jsx                     ← lifted formData state, step control
    ├── App.css
    ├── index.css                   ← CSS variables, global reset
    └── components/
        ├── ProgressBar.jsx         ← step dots, connecting track, pulse animation
        ├── ProgressBar.css
        ├── FormField.jsx           ← reusable: label + input + error + suffix slot
        ├── FormField.css
        ├── StepPersonal.jsx        ← Step 1
        ├── StepAccount.jsx         ← Step 2 (email, password, show/hide)
        ├── StepReview.jsx          ← Step 3 (data summary)
        ├── StepReview.css
        ├── SuccessScreen.jsx       ← post-submit screen
        ├── SuccessScreen.css
        └── Steps.css               ← shared: buttons, field-row, strength bar
```

---

## 🚀 Running Locally

```bash
# Clone
git clone https://github.com/ashish-bisht-iot/sprint07.git
cd sprint07

# Install
npm install

# Start dev server
npm run dev
# → http://localhost:5173
```

---

## 🌐 Deploying to Vercel

1. Push repo to GitHub (must be public)
2. Go to [vercel.com](https://vercel.com) → Add New Project → Import
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

> ⚠️ **Vercel is case-sensitive.** `import FormField from './formfield'` fails if the file is named `FormField.jsx`. All imports in this project use the exact filename casing.

---

## 📸 How to Add Screenshots

1. Run locally: `npm run dev` → open `http://localhost:5173`
2. Create a `/screenshots` folder in the project root
3. Capture each state and save with these exact filenames:

```
screenshots/
  step1-personal-info.png       ← Step 1 clean/empty
  step1-validation.png          ← Step 1 with error messages showing
  step2-account.png             ← Step 2 clean
  step2-errors.png              ← Step 2 with email/password errors
  step2-show-password.png       ← Step 2 with password text visible
  step3-review.png              ← Review screen with all data filled
  back-button-state.png         ← Step 1 after navigating back (data still there)
  success-screen.png            ← Post-submit success screen
  console-log.png               ← DevTools console showing formData object
```

4. `git add screenshots/ && git commit -m "add screenshots" && git push`
5. GitHub renders them inline in the README automatically ✅

---

*Ashish Bisht — Sprint 07 — Prodesk IT Internship*
