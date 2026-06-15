# Heroku Deployment Guide for Phunyezwamjoli72@gmail.com

## Project: Phumeh Stay ZA (phumeh-stay-za)

This guide provides step-by-step instructions for deploying the Phumeh application to Heroku.

---

## Current Setup

Your project is already configured for Heroku deployment with:

- **Heroku App Name**: `phumeh-stay-za`
- **Heroku Git Remote**: `https://git.heroku.com/phumeh-stay-za.git`
- **GitHub Remote**: `https://github.com/Sphile2012/PhunyezwaP.git`

### Existing Configuration Files

1. **Procfile** - Tells Heroku how to start your app:
   ```
   web: node server.cjs
   ```

2. **package.json** - Already includes Heroku build scripts:
   ```json
   "scripts": {
     "start": "node server.cjs",
     "heroku-postbuild": "npm run build"
   },
   "engines": {
     "node": ">=18.0.0"
   }
   ```

3. **server.cjs** - Express server that serves the built React app

---

## Deployment Steps

### Step 1: Log in to Heroku

Use the email **Phunyezwamjoli72@gmail.com** to log in:

```bash
heroku login
```

This will open a browser window. Log in with your Heroku credentials associated with Phunyezwamjoli72@gmail.com.

Alternatively, use the interactive option:
```bash
heroku login -i
```
Then enter your email (Phunyezwamjoli72@gmail.com) and password.

### Step 2: Verify Heroku App Access

After logging in, verify you have access to the app:

```bash
heroku apps:info --app phumeh-stay-za
```

You should see app details including the app URL.

### Step 3: Deploy to Heroku

Push your code to Heroku:

```bash
git push heroku main
```

Or if your default branch is `master`:
```bash
git push heroku master
```

### Step 4: Open the Application

Once deployment is complete, open your app:

```bash
heroku open --app phumeh-stay-za
```

---

## Managing Environment Variables

If your app needs environment variables (API keys, database URLs, etc.):

```bash
heroku config:set VARIABLE_NAME=value --app phumeh-stay-za
```

View all config vars:
```bash
heroku config --app phumeh-stay-za
```

---

## Viewing Logs

To view real-time logs:
```bash
heroku logs --tail --app phumeh-stay-za
```

To view recent logs:
```bash
heroku logs --num 100 --app phumeh-stay-za
```

---

## Scaling Dynos

Check current dyno status:
```bash
heroku ps --app phumeh-stay-za
```

Scale web dynos (if needed):
```bash
heroku ps:scale web=1 --app phumeh-stay-za
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `heroku login` | Log in to Heroku |
| `heroku apps` | List all your apps |
| `heroku apps:info --app phumeh-stay-za` | Show app details |
| `git push heroku main` | Deploy to Heroku |
| `heroku open --app phumeh-stay-za` | Open app in browser |
| `heroku logs --tail --app phumeh-stay-za` | Stream logs |
| `heroku config --app phumeh-stay-za` | View environment variables |
| `heroku run npm run build --app phumeh-stay-za` | Run build manually |
| `heroku restart --app phumeh-stay-za` | Restart the app |

---

## Troubleshooting

### Build Failures

If the build fails, check the logs:
```bash
heroku logs --app phumeh-stay-za --source app
```

Common issues:
- Node version mismatch (ensure Node >= 18.0.0)
- Missing dependencies in package.json
- Build script errors

### App Not Starting

Check if the app is running:
```bash
heroku ps --app phumeh-stay-za
```

Restart the app:
```bash
heroku restart --app phumeh-stay-za
```

### Permission Issues

If you get permission errors, ensure you're logged in with the correct email:
```bash
heroku auth:whoami
```

If it shows a different email, log out and log back in:
```bash
heroku logout
heroku login
```

---

## App URL

Your app will be available at:
```
https://phumeh-stay-za.herokuapp.com
```

Or if a custom domain is configured, check with:
```bash
heroku domains --app phumeh-stay-za
```

---

## Notes

- The app uses Express to serve the built React/Vite application
- Build process: `npm run build` creates the `dist` folder
- The server serves static files from `dist` and handles SPA routing
- Heroku automatically runs `heroku-postbuild` script after installing dependencies

---

**Last Updated**: 2026-06-15
**Contact**: Phunyezwamjoli72@gmail.com