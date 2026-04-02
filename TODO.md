# Project TODO

## 🔐 Auth

### 🔥 CRITICAL (before production)

* [ ] Brute force protection (OTP verification)

  * Limit incorrect attempts per OTP (e.g. max 5 tries)
  * Block or invalidate OTP after too many failures

* [ ] Resend cooldown (backend)

  * Prevent multiple OTP sends within short time (30–60s)
  * Check last OTP created_at before allowing new one

* [ ] OTP request rate limiting

  * Limit requests per email
  * Limit requests per IP
  * Prevent abuse/spam of sendCode endpoint

### 🟧 IMPORTANT (next step)

* [ ] Email templates

  * Clear subject (e.g. "Your verification code")
  * Include expiration info (5 minutes)
  * Add security note ("If you didn’t request this...")
  * (Optional) HTML version later

* [ ] Forgot password flow

  * Reuse OTP system (purpose="password_reset")
  * Same PinInput UX

### 🟨 AUTH FEATURES (product)

* [ ] Login with email (in addition to username)

  * Allow login via email OR username
  * Update backend authentication logic
  * Adjust validation & UI if needed

* [ ] Social login (Google, Facebook)

  * Implement OAuth flow
  * Activate existing UI buttons
  * Handle user creation / linking accounts

### 🟨 NICE TO HAVE

* [ ] OTP cleanup job

  * Delete old OTP records (e.g. older than 1 day)
  * Could be cron job or periodic task

* [ ] OTP model refactor

  * Consider adding `expires_at` OR `status`
  * Improve clarity (pending / used / expired)

### 🟦 PRODUCTION POLISH

* [ ] Production email provider

  * Resend / Postmark / SendGrid
  * Domain verification (SPF, DKIM)
  * Avoid spam issues

### 🧠 NOTES

* Focus first on **security + abuse prevention**
* OTP flow already works end-to-end ✅
* Remaining tasks are mostly **hardening + UX improvements**

---

## 🎲 Board Games Pages

* [ ] Game Detail Page
