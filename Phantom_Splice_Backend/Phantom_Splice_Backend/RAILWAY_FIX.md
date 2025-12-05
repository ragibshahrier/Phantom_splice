# Railway Connection Refused Fix

## Error Analysis

```
error: "connection refused"
httpStatus: 502
```

This means the app **isn't starting** or **isn't binding to the correct port**.

## Root Cause

Railway expects the app to bind to `0.0.0.0:$PORT` where `$PORT` is provided by Railway.

## Fixes Applied

### 1. Updated railway.json
- Reduced workers from 2 to 1 (less memory)
- Added threads for concurrency
- Added debug logging
- Explicit port binding

### 2. Updated Procfile
- Same changes as railway.json
- Added access and error log output

### 3. Created nixpacks.toml
- Explicit Python 3.12 configuration
- Clear build and start commands

### 4. Created start.sh
- Bash script with explicit port handling
- Debug output for troubleshooting
- Fallback to port 5000 if $PORT not set

## Railway Dashboard Fixes

### Fix 1: Set Start Command Manually

Go to Railway Dashboard:
1. Select your service
2. Go to **Settings** → **Deploy**
3. Set **Start Command**:
```bash
gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120
```
4. Click **Save**
5. Redeploy

### Fix 2: Check Root Directory

1. Go to **Settings** → **General**
2. **Root Directory** should be empty OR set to:
```
Phantom_Splice_Backend/Phantom_Splice_Backend
```
3. If it's pointing to wrong directory, fix it
4. Redeploy

### Fix 3: Check Build Logs

1. Go to **Deployments** tab
2. Click latest deployment
3. Check **Build Logs**
4. Look for errors during:
   - Python installation
   - pip install
   - Dependency installation

### Fix 4: Check Deploy Logs

1. In **Deployments**, click **View Logs**
2. Look for:
   - "Starting gunicorn..."
   - "Listening at: http://0.0.0.0:XXXX"
   - Any error messages

## Common Issues

### Issue 1: Wrong Directory Structure

Railway needs to see these files in the root:
- `app_simple.py`
- `requirements.txt`
- `Procfile` or `railway.json`

**Fix:** Set Root Directory correctly in Railway settings

### Issue 2: Missing Dependencies

**Check build logs for:**
```
ERROR: Could not find a version that satisfies the requirement...
```

**Fix:** Verify requirements.txt is complete

### Issue 3: Port Not Binding

**Check deploy logs for:**
```
Failed to bind to 0.0.0.0:$PORT
```

**Fix:** Ensure gunicorn command uses `$PORT` variable

### Issue 4: App Crashes on Start

**Check deploy logs for:**
```
ImportError: No module named...
```

**Fix:** Add missing dependency to requirements.txt

## Manual Deployment Test

### Option 1: Use Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Check logs
railway logs

# Redeploy
railway up
```

### Option 2: Force Redeploy

1. Go to Railway Dashboard
2. Click **Deployments**
3. Click **⋮** (three dots) on latest deployment
4. Click **Redeploy**
5. Watch logs

## Debugging Steps

### Step 1: Check if Python is Installing

Build logs should show:
```
Installing Python 3.12...
✓ Python installed
```

### Step 2: Check if Dependencies Install

Build logs should show:
```
pip install -r requirements.txt
Successfully installed flask-3.0.0 flask-cors-4.0.0 ...
```

### Step 3: Check if Gunicorn Starts

Deploy logs should show:
```
Starting gunicorn...
[INFO] Listening at: http://0.0.0.0:XXXX
```

### Step 4: Check for Crashes

Deploy logs should NOT show:
```
Worker failed to boot
Application failed to start
```

## Quick Fix Commands

### In Railway Dashboard

**Settings → Deploy → Start Command:**
```bash
gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120
```

**Settings → General → Root Directory:**
```
Phantom_Splice_Backend/Phantom_Splice_Backend
```

**Variables → Add Variable:**
```
NUMBA_DISABLE_JIT = 1
```

## Test After Fix

```bash
# Test root page
curl https://phantomsplice-production.up.railway.app/

# Test health
curl https://phantomsplice-production.up.railway.app/health

# Check Railway logs
railway logs
```

## Alternative: Simpler Deployment

If issues persist, try deploying with minimal configuration:

### 1. Remove all config files except requirements.txt

Keep only:
- `app_simple.py`
- `requirements.txt`

### 2. Set Start Command in Railway Dashboard

```bash
python -m gunicorn app_simple:app --bind 0.0.0.0:$PORT
```

### 3. Let Railway auto-detect everything else

## Expected Logs (Success)

```
Building...
✓ Python 3.12 installed
✓ Dependencies installed
Deploying...
Starting gunicorn...
[INFO] Starting gunicorn 21.2.0
[INFO] Listening at: http://0.0.0.0:8080
[INFO] Using worker: sync
[INFO] Booting worker with pid: 123
```

## Next Steps

1. **Push changes to GitHub**
```bash
git add .
git commit -m "Fix Railway deployment configuration"
git push
```

2. **Wait for auto-deploy** or manually redeploy

3. **Check logs** in Railway dashboard

4. **Test endpoints**:
   - `/` - Should show debug page
   - `/health` - Should return JSON

5. **If still failing**, share the full deploy logs

## Status

Configuration files updated. Push to GitHub and redeploy on Railway.

The key fix is ensuring gunicorn binds to `0.0.0.0:$PORT` where Railway provides the PORT.
