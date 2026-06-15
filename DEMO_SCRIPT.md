# 🎬 Sprint 07 — Demo Video Script
**Target Duration: 2.5 – 3 minutes**

---

## Before You Hit Record

- Open the live Vercel URL in Chrome (not localhost)
- Open DevTools → Console tab and keep it ready (`F12`)
- Set browser zoom to ~90% so the full wizard card is visible
- Clear the console (`Ctrl + L`)
- Keep this script on your phone to glance at while recording

---

## 🎙️ THE SCRIPT

---

### [0:00 – 0:20] Opening — What You Built

*(Show the live site loading in the browser)*

> "Hey, this is Ashish. This is my Sprint 07 submission — The Registration Wizard,
> built with React and Vite and deployed on Vercel."

> "The idea behind this sprint was to build a multi-step onboarding form — the kind
> you see in real SaaS products where instead of dumping 20 fields on one screen,
> you break the experience into focused steps."

> "This wizard has three steps — Personal Info, Account Details, and a Review screen.
> Let me walk you through it."

---

### [0:20 – 0:45] Progress Bar + Step 1 Overview

*(Point cursor to the progress bar at the top)*

> "At the top you can see the progress indicator — Step 1 of 3, with an animated
> pulse on the active dot and a connecting line that fills as you advance."

*(Point to the disabled Continue button)*

> "The Continue button is disabled right now. It stays locked until every field in
> the current step passes validation. You can't skip ahead with empty data."

---

### [0:45 – 1:10] Step 1 — Validation Demo

*(Type a single letter "A" in First Name)*

> "If I type just one character in First Name and move to the next field..."

*(Click into Last Name — error appears on First Name)*

> "...the error fires immediately. This is onChange validation — it doesn't wait
> for a submit event. The moment I touched the field and the value didn't pass,
> the red border and error message appeared."

*(Now fill everything correctly — "Ashish", "Bisht", pick any date)*

> "Once all three fields are valid, the errors clear and the Continue button
> unlocks automatically."

*(Click Continue)*

---

### [1:10 – 1:50] Step 2 — Real-Time Errors + Show/Hide

*(Step 2 loads — point to the progress bar at 50%)*

> "Step 2 — Account Details. Progress bar has advanced."

*(Type an invalid email — "ashishgmail.com" with no @)*

> "If I type an email without the @ symbol..."

*(Pause so the error is visible on screen)*

> "...the validation fires in real time. I'm using the standard email regex pattern
> which checks the format on every single keystroke."

*(Fix it — type "ashish@gmail.com")*

*(Type a short password — "pass")*

> "Password needs a minimum of 8 characters. You can see the strength meter here —
> it's showing Weak."

*(Keep typing — "password123" — strength updates)*

> "As I type, the meter updates live — Fair, Good, Strong."

*(Type something wrong in Confirm Password — "password456")*

> "If Confirm Password doesn't match..."

*(Point to the mismatch error)*

> "Mismatch error — immediately."

*(Fix it — type "password123" in confirm too)*

*(Click the eye icon on the password field)*

> "There's also a show/hide toggle on both password fields — the eye icon switches
> the input type between password and text."

*(Click the Review button)*

---

### [1:50 – 2:20] The Core Feature — Back Button State Persistence

*(Now on the Review screen — Step 3)*

> "Before I submit, I want to show the most important feature of this sprint."

*(Click Back)*

> "Clicking Back takes me to Step 2..."

*(Step 2 loads — all fields still filled — point to them)*

> "My email and password are still there."

*(Click Back again)*

> "Back to Step 1..."

*(Step 1 loads — First Name and Last Name still showing)*

> "And Step 1 data is completely preserved."

> "This works because of a concept called lifted state. Instead of storing form data
> inside each step component — where it would get destroyed when the component
> unmounts — I store everything in the parent App component, which never unmounts.
> The steps are just views that read from and write to that shared state object."

> "This is the core architectural challenge of the sprint."

*(Click Continue → Continue to get back to Step 3)*

---

### [2:20 – 2:45] Step 3 — Review, Submit, Console

*(Show the Review screen)*

> "Step 3 renders a full summary of everything collected. The password is masked
> with bullet characters — it doesn't show in plain text."

*(Open DevTools Console — F12)*

> "Let me open the console before I submit."

*(Click Submit)*

> "Clicking Submit logs the finalized data object..."

*(Point to the console output)*

> "There it is — the complete registration payload. First name, last name, date of
> birth, email, password. In a real application this would go to a backend API
> as a POST request. Here it confirms the client-side data compilation is correct."

*(Point to the success screen)*

> "And the UI transitions to the success confirmation screen."

---

### [2:45 – 3:00] Closing

> "To summarize — this sprint covered multi-step conditional rendering, state lifting
> for cross-step data persistence, real-time onChange validation with a touched-state
> pattern, email regex validation, conditional button disabling, and show/hide
> password toggles."

> "Live link and GitHub repo are in the submission. Thanks."

*(Stop recording)*

---

## ⚡ Must-Show Checklist (Evaluation Criteria)

The sprint brief explicitly says the QA demo **must** demonstrate these two things:

| What | When |
|---|---|
| ✅ Real-time error messages rendering | 0:45 – 1:50 |
| ✅ Back button retaining state data | 1:50 – 2:20 |

Don't skip either. These are the grading criteria by name.

---

## 🎤 Delivery Tips

- **Pause after every action** — give the evaluator 1–2 seconds to see the result before you speak
- **Move your cursor** to what you're about to describe, then say it
- **No filler words** — "um", "so basically", "you know" — they kill the confidence impression
- **One take is fine** — small stumbles don't matter, restarting wastes time
- Use **Loom** (free), **OBS**, or just a phone propped facing the screen
