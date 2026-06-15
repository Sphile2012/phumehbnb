# Manual Heroku Deployment Instructions

## For Phunyezwamjoli72@gmail.com

Since the automated deployment requires interactive authentication, please follow these manual steps:

---

## Step 1: Log in to Heroku

Open a new terminal or command prompt and run:

```bash
heroku login
```

**What will happen:**
- The CLI will display: "Press any key to open up the browser to login or q to exit"
- Press any key (e.g., Enter or Space)
- Your default browser will open to the Heroku login page
- Log in with your credentials: **Phunyezwamjoli72@gmail.com**
- After successful login, return to the terminal

**Alternative (interactive mode):**
```bash
heroku login -i
```
Then enter:
- Email: Phunyezwamjoli72@gmail.com
- Password: (your Heroku password or API key)

---

## Step 2: Verify Login

After logging in, verify your session:

```bash
heroku auth:whoami
```

You should see: `Phunyezwamjoli72@gmail.com`

---

## Step 3: Deploy to Heroku

Now push your code to Heroku:

```bash
git push heroku main
```

**What will happen:**
- Git will push your code to Heroku's repository
- Heroku will automatically:
  1. Detect your Node.js app
  2. Install dependencies (`npm install`)
  3. Run the build script (`npm run build`)
  4. Start your app using the Procfile (`node server.cjs`)

**Wait for completion** - You'll see output like:
```
-----> Node.js app detected
-----> Building dependencies
-----> Installing dependencies
-----> Build succeeded!
-----> Discovering process types
       Procfile declares types -> web
-----> Compressing...
-----> Uploading...
-----> Launching...
```

---

## Step 4: Open Your App

Once deployment completes, open your app:

```bash
heroku open --app phumeh-stay-za
```

Your app will open in a new browser tab at:
```
https://phumeh-stay-za.herokuapp.com
```

---

## Step 5: Verify Deployment

Check that your app is running:

```bash
heroku ps --app phumeh-stay-za
```

You should see:
```
=== web (1X): npm start
web.1: up for Xs
```

View recent logs:
```bash
heroku logs --tail --app phumeh-stay-za
```

---

## Troubleshooting

### If you get "Invalid credentials"
```bash
heroku logout
heroku login
```
Then log in again with Phunyezwamjoli72@gmail.com

### If you get "No such app"
The app `phumeh-stay-za` might not exist in your Heroku account. You can:
1. Create it: `heroku create phumeh-stay-za`
2. Or check your apps: `heroku apps`

### If the push fails
Try:
```bash
git push heroku main --force
```

### If the build fails
Check the logs:
```bash
heroku logs --app phumeh-stay-za --source app
```

Common issues:
- Node version (must be >= 18.0.0)
- Missing dependencies
- Build errors

---

## Quick Command Reference

```bash
# Login
heroku login

# Deploy
git push heroku main

# Open app
heroku open --app phumeh-stay-za

# View logs
heroku logs --tail --app phumeh-stay-za

# Check status
heroku ps --app phumeh-stay-za

# View config vars
heroku config --app phumeh-stay-za

# Restart app
heroku restart --app phumeh-stay-za
```

---

## Important Notes

- ✅ Your GitHub remote is now: `https://github.com/Sphile2012/phumehbnb.git`
- ✅ All changes have been pushed to GitHub
- ✅ Heroku deployment guide is in the repository
- ⏳ Heroku deployment requires manual authentication

**After completing these steps, your app will be live at:**
```
https://phumeh-stay-za.herokuapp.com
```

---

**Contact**: Phunyezwamjoli72@gmail.com
**Date**: 2026-06-15