# AUTH.md - Authentication System Documentation

## Overview

This project implements a **Dual-Mode Authentication System** that ensures zero failures regardless of environment configuration.

## Modes

### 1. DemoAuth (Default)

**Status**: Always active when production env vars are missing.

**How it works**:

- Users stored in `localStorage` (key: `auth_users`)
- Sessions stored in `localStorage` (key: `auth_session`)
- Password hashed with Web Crypto SHA-256
- Session expires after 7 days

**Security Level**: 🟡 Demo-grade (NOT production secure)

- Passwords are hashed but stored client-side
- No server validation
- Suitable for hackathon demos only

### 2. ProductionAuth (Optional)

**Status**: Activates automatically if env vars are present.

**Required Environment Variables**:

```
AUTH_PROVIDER_URL=https://your-auth-provider.com
AUTH_SECRET=your-secret-key
```

**Security Level**: 🟢 Production-grade (when configured)

## Free Answer Gate

To encourage signups while allowing exploration:

1. **Logged out users** get exactly **1 free AI answer**
2. After using the free answer, login/signup is required
3. Logging out does NOT reset the free answer (prevents cheating)

**Implementation**:

- `localStorage` key: `free_answer_used = "1"`
- Checked via `auth.isQuestionAllowed()`
- Set via `auth.markFreeQuestionUsed()`

## Files

| File                                  | Purpose                              |
| ------------------------------------- | ------------------------------------ |
| `src/lib/auth/AuthProvider.js`        | Main auth class with dual-mode logic |
| `src/components/AuthModal.jsx`        | Login/Signup UI modal                |
| `src/components/AuthModal.module.css` | Modal styling                        |

## Security Tradeoffs

| Aspect       | DemoAuth          | ProductionAuth   |
| ------------ | ----------------- | ---------------- |
| Storage      | LocalStorage      | Server/DB        |
| Password     | SHA-256 (client)  | bcrypt (server)  |
| Sessions     | Client token      | Server-validated |
| Suitable for | Demos, hackathons | Real users       |

## Recommendation

For hackathon submission: **DemoAuth is sufficient**.
For production: Configure a real auth provider (Auth0, Clerk, Supabase Auth).
