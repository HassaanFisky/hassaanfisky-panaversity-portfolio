# AUTH-VERIFY.md

## Feature: Authentication & Free Answer Gate

### Files Changed

- `src/lib/auth/AuthProvider.js` - DemoAuth implementation
- `src/components/AuthModal.jsx` - Login/Signup modal UI
- `src/components/ChatWidget.jsx` - Auth gate integration

### How it Works

1. First-time user gets 1 free AI answer
2. After using free answer, auth modal appears
3. User can sign up or sign in
4. Logged-in users have unlimited chat

### Auth Flow

```
Guest → 1 free answer → Auth required → Sign up/Sign in → Unlimited
```

### Test Locally

```bash
# Clear auth state
localStorage.removeItem('free_answer_used')
localStorage.removeItem('auth_session')
localStorage.removeItem('auth_users')

npm start
# Ask one question → Should work
# Ask second question → Auth modal appears
# Sign up with email/password
# Continue chatting
```

### Manual Checklist

- [ ] First question works for guests
- [ ] Second question triggers auth modal
- [ ] Sign up creates account
- [ ] Sign in works for existing users
- [ ] Sign out button appears when logged in
- [ ] Logout does NOT reset free answer
- [ ] Session persists across sessions (7 days)

### Security Note

⚠️ DemoAuth uses localStorage. Not production secure.
See `/artifacts/AUTH.md` for full documentation.

### Blockers

None (DemoAuth works without any env vars)
