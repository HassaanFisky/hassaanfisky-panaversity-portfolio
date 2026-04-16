# Physical AI Textbook — Test Plan

## Overview

This document outlines the verification procedures for the Physical AI & Humanoid Robotics textbook submission. All tests should pass before deployment.

---

## 1. Development Server Test

**Command:**

```bash
cd book-site
npm install
npm run start
```

**Expected Result:**

- Server starts on http://localhost:3000
- No compilation errors
- All 5 chapter pages accessible via sidebar
- Navigation between chapters works

**Verification:**

```bash
# Open browser and navigate to:
# http://localhost:3000/docs/01-intro
# http://localhost:3000/docs/02-core
# http://localhost:3000/docs/03-howto
# http://localhost:3000/docs/04-examples
# http://localhost:3000/docs/05-appendix
```

---

## 2. Production Build Test

**Command:**

```bash
cd book-site
npm run build
```

**Expected Result:**

- Build completes with exit code 0
- Output directory `build/` created
- No broken link errors
- No missing asset warnings

**Success Criteria:**

```
[SUCCESS] Generated static files in "build".
```

---

## 3. Run Example Test

**Command:**

```bash
cd examples
npm install
node run-example.js
```

**Expected Result:**

- Script executes without errors
- Exit code 0
- Output shows:
  - Robot initialization
  - Forward kinematics calculations
  - Motion trajectory steps
  - "Demo completed successfully"

**Sample Expected Output:**

```
╔══════════════════════════════════════════════════╗
║   Physical AI & Humanoid Robotics - Demo         ║
╚══════════════════════════════════════════════════╝

► Initializing robot...
[HumanoidBot-01] Status: idle
...
╔══════════════════════════════════════════════════╗
║   ✓ Demo completed successfully!                 ║
╚══════════════════════════════════════════════════╝
```

---

## 4. Chat API Test

**Command:**

```bash
cd api
npm install
node chat.js
```

**Expected Result:**

- Server starts on http://localhost:3002
- Health endpoint responds: GET /api/health
- Chat endpoint accepts POST /api/chat

**Verification:**

```bash
curl http://localhost:3002/api/health
# Expected: {"status":"ok","service":"Physical AI Textbook Chat API",...}

curl -X POST http://localhost:3002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is physical AI?"}'
# Expected: {"answer":"...","sources":[...]}
```

---

## 5. Link Check Test

**Command:**

```bash
cd book-site
npm run build
npx broken-link-checker http://localhost:3000 --recursive
```

**Alternative (manual grep):**

```bash
grep -r "](/docs/" docs/*.md | grep -v "01-intro\|02-core\|03-howto\|04-examples\|05-appendix"
```

**Expected Result:**

- No broken internal links
- All chapter cross-references valid
- External URLs accessible (or flagged appropriately)

---

## 6. UI Prototype Test

**Verification:**

1. Open `ui-variant/index.html` in browser
2. Verify glassmorphism effects render
3. Check animated background orbs
4. Test chat widget expand/collapse
5. Verify responsive layout (resize browser)
6. Check navigation links

**Expected Result:**

- Visual design matches iOS-26 glassmorphism spec
- Animations smooth (60fps)
- Chat widget functional
- Mobile layout works at 375px width

---

## 7. Environment Variables Check

**Verification:**

```bash
# Check .env file exists and contains:
cat .env | grep -E "OPENROUTER_API_KEY|GEMINI_API_KEY"
```

**Security Check:**

```bash
# Ensure .env is not tracked
git status --short | grep ".env"
# Should show nothing or "?? .env" (untracked)
```

---

## Test Summary Table

| Test       | Command               | Pass Criteria             |
| ---------- | --------------------- | ------------------------- |
| Dev Server | `npm run start`       | Opens localhost:3000      |
| Build      | `npm run build`       | Exit code 0               |
| Example    | `node run-example.js` | Exit code 0               |
| Chat API   | `node chat.js`        | Health endpoint OK        |
| Links      | Manual/tool check     | No broken links           |
| UI         | Browser inspection    | Visual compliance         |
| Env        | File inspection       | Keys present, not tracked |

---

## Troubleshooting

### Build Fails

- Check Node.js version ≥ 18
- Delete `node_modules` and reinstall
- Verify `docusaurus.config.js` syntax

### Example Crashes

- Ensure `mathjs` and `dotenv` installed
- Check for `.env` file presence

### Chat API Errors

- Verify OPENROUTER_API_KEY in .env
- Check network connectivity
- Review server logs for API response errors
