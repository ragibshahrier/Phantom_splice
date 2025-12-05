# Simple Railway Fix

## The Issue
Railway's build is failing because of configuration conflicts.

## Simple Solution

### Step 1: Remove Custom Configs (Let Railway Auto-Detect)

Delete these files from Railway (or don't commit them):
- `nixpacks.toml` ❌ (already deleted)
- `railway.json` ❌ (can cause issues)

Keep only:
- `app_simple.py` ✅
- `requirements.txt` ✅
- `Procfile` ✅
- `runtime.txt` ✅

### Step 2: Verify Procfile

Make sure `Procfile` contains:
```
web: gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120
```

### Step 3: Railway Dashboard Settings

**Go to Railway Dashboard → Your Service → Settings**

#### A. Root Directory
**Settings → General → Root Directory:**
```
Phantom_Splice_Backend/Phantom_Splice_Backend
```

#### B. Start Command (Override)
**Settings → Deploy → Start Command:**
```
gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120
```

#### C. Build Command (Leave Empty)
**Settings → Deploy → Build Command:**
```
(leave empty - Railway will auto-detect)
```

### Step 4: Redeploy

1. Click **Deployments** tab
2. Click **Redeploy** button
3. Watch the logs

## Expected Success Logs

```
Nixpacks build
✓ Detected Python
✓ Installing Python 3.12
✓ Installing dependencies from requirements.txt
✓ Build complete

Deploying...
Starting gunicorn...
[INFO] Listening at: http://0.0.0.0:XXXX
✓ Deployment successful
```

## If Still Failing

### Option 1: Manual Railway Configuration

1. **Delete railway.json** (it might be conflicting)
2. **Keep only**: app_simple.py, requirements.txt, Procfile, runtime.txt
3. **Set Start Command in Dashboard** (as shown above)
4. **Redeploy**

### Option 2: Check Requirements.txt

Make sure it's not empty and contains:
```
flask==3.0.0
flask-cors==4.0.0
rembg==2.0.57
pillow==10.1.0
gunicorn==21.2.0
```

### Option 3: Check Runtime.txt

Should contain:
```
python-3.12.0
```

## Quick Deploy

```bash
# Remove problematic files
rm nixpacks.toml  # already done
rm railway.json   # optional

# Commit
git add .
git commit -m "Simplify Railway config"
git push

# Railway will auto-deploy
```

## Test After Deploy

```bash
curl https://phantomsplice-production.up.railway.app/
curl https://phantomsplice-production.up.railway.app/health
```

## Status

- ✅ Removed nixpacks.toml
- ✅ Simplified configuration
- ⏳ Ready to redeploy

**Next:** Push to GitHub and let Railway auto-deploy with simpler config.
