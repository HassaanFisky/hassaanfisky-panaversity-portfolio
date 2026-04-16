# 🚀 Vercel Deployment Guide - EXACT STEPS

## ✅ Short Answer: **JUST REDEPLOY** (Don't Delete!)

**DO NOT** delete your existing Vercel project!  
**Just trigger a new deployment** - Vercel will automatically pull the latest code from GitHub.

---

## 📋 Option 1: Redeploy Existing Project (EASIEST) ⭐

### Step 1: Update Vercel Settings

1. Go to https://vercel.com/dashboard
2. Click on your project: `physical-ai-humanoid-robots-textboo`
3. Click **Settings** → **General**

### Step 2: Fix Build Configuration

Scroll to **Build & Development Settings** and set:

| Setting          | Value                                          |
| ---------------- | ---------------------------------------------- |
| Framework Preset | `Docusaurus`                                   |
| Root Directory   | **Leave EMPTY** (important!)                   |
| Build Command    | `cd book-site && npm install && npm run build` |
| Output Directory | `book-site/build`                              |
| Install Command  | `npm install`                                  |

Click **Save** after each change.

### Step 3: Add Environment Variable

1. Still in Settings → **Environment Variables**
2. Click **Add New**
3. **Key:** `OPENROUTER_API_KEY`
4. **Value:** `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`
5. **Environment:** Select **Production**, **Preview**, and **Development** (all 3)
6. Click **Save**

### Step 4: Trigger Redeploy

1. Go to **Deployments** tab
2. Click **⋯** (three dots) next to the latest deployment
3. Click **Redeploy**
4. ✅ Wait 2-3 minutes for build to complete

---

## 📋 Option 2: Import Fresh (If Option 1 Fails)

### Only do this if redeployment doesn't work!

1. Go to Vercel Dashboard
2. **Don't delete** old project (keep as backup)
3. Click **Add New** → **Project**
4. Select GitHub repo: `Physical-AI-Humanoid-Robots-Textbook`
5. Use settings from Option 1 above
6. Click **Deploy**

---

## ✅ Verification After Deployment

Once deployed, check:

1. **Homepage loads:** https://your-domain.vercel.app/ (not 404!)
2. **ChatBot visible:** Bottom-right corner floating widget 🤖
3. **Type a question:** "What is Physical AI?"
4. **Bot responds:** Should answer with textbook content
5. **Navigation works:** Click "Chapters" → All 5 chapters load

---

## 🔧 What's Been Fixed

✅ **Repository is CLEAN:**

- No unnecessary files pushed
- `.env` excluded (secrets safe)
- `node_modules/` excluded
- Temp audit files excluded
- Only production code in repo

✅ **Latest Commit:** `a6c3e35`

- ChatBot integrated
- Build passing
- Vercel config ready

---

## 🚨 Troubleshooting

### Build Fails?

**Error:** "Cannot find module..."  
**Fix:** Make sure Build Command is: `cd book-site && npm install && npm run build`

### Still 404?

**Error:** Site returns 404  
**Fix:** Check Output Directory is `book-site/build` (with the slash)

### ChatBot Not Working?

**Error:** "API not configured"  
**Fix:** Add `OPENROUTER_API_KEY` environment variable in Vercel

### Wrong Directory Error?

**Error:** "docusaurus.config.js not found"  
**Fix:** Root Directory should be **EMPTY** (not `book-site`)

---

## 📊 Expected Result

**Live Site:** https://physical-ai-humanoid-robots-textboo.vercel.app/  
**Status:** 🟢 200 OK (not 404)  
**ChatBot:** 🤖 Visible and responding  
**Build Time:** ~2-3 minutes

---

## 🎯 Final Checklist

Before you start:

- [x] Code pushed to GitHub (commit `a6c3e35`) ✅
- [x] Build passes locally ✅
- [x] .gitignore clean ✅
- [x] Secrets excluded ✅

Do this now:

- [ ] Go to Vercel dashboard
- [ ] Update build settings
- [ ] Add OPENROUTER_API_KEY env var
- [ ] Click Redeploy
- [ ] Verify site loads + chatbot works

---

**Recommendation:** Use **Option 1 (Redeploy)** - it's faster and safer!

Good luck! 🚀
