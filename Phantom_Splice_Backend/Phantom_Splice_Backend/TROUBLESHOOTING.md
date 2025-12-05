# Railway Deployment Troubleshooting

## Issue: Backend not responding at Railway URL

### Quick Checks

1. **Check Railway Logs**
   - Go to Railway dashboard
   - Select your project
   - Click "Deployments" tab
   - View latest deployment logs
   - Look for errors

2. **Verify Deployment Status**
   - Check if deployment is "Active" (green)
   - If "Failed" (red), check build logs
   - If "Building", wait for completion

3. **Test Health Endpoint**
   ```bash
   curl https://phantomsplice-production.up.railway.app/health
   ```
   
   Expected response:
   ```json
   {"status": "alive", "message": "The spirits are ready"}
   ```

### Common Issues & Solutions

#### Issue 1: Build Failed
**Symptoms:** Deployment shows "Failed" status

**Solutions:**
- Check Railway logs for error messages
- Verify all files are in the correct directory
- Ensure requirements.txt is complete
- Check Python version compatibility

**Fix:**
```bash
# Make sure you're deploying from the correct directory
# Railway should point to: Phantom_Splice_Backend/Phantom_Splice_Backend
```

#### Issue 2: Port Binding Error
**Symptoms:** "Address already in use" or port errors

**Solutions:**
- Verify app reads PORT from environment
- Check app_simple.py has: `port = int(os.environ.get('PORT', 5000))`
- Railway automatically sets PORT variable

#### Issue 3: Out of Memory
**Symptoms:** Deployment crashes, 502 errors

**Solutions:**
- rembg requires significant memory
- Railway Hobby plan: 512MB (may be insufficient)
- Upgrade to Railway Pro: 8GB RAM
- Or reduce image processing size

**Fix in Railway:**
- Go to Settings → Plan
- Upgrade to Pro plan

#### Issue 4: Missing Dependencies
**Symptoms:** Import errors in logs

**Solutions:**
- Verify requirements.txt includes all dependencies:
  ```
  flask==3.0.0
  flask-cors==4.0.0
  rembg==2.0.57
  pillow==10.1.0
  gunicorn==21.2.0
  ```

#### Issue 5: Wrong Start Command
**Symptoms:** App doesn't start, no logs

**Solutions:**
- Check Railway start command
- Should be: `gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
- Or Railway should auto-detect from Procfile

**Fix in Railway:**
- Go to Settings → Deploy
- Set custom start command if needed

#### Issue 6: CORS Issues
**Symptoms:** Frontend can't connect, CORS errors

**Solutions:**
- Verify CORS is enabled in app_simple.py
- Should have: `CORS(app)` after `app = Flask(__name__)`

#### Issue 7: Timeout on Large Images
**Symptoms:** 504 Gateway Timeout

**Solutions:**
- Increase timeout in Procfile
- Current: 120 seconds
- Increase if needed: `--timeout 300`

### Debugging Steps

#### Step 1: Check Railway Dashboard
1. Go to https://railway.app
2. Select "phantomsplice-production"
3. Check deployment status
4. View logs for errors

#### Step 2: Verify Environment
In Railway dashboard:
- Go to Variables tab
- Verify PORT is set (Railway sets this automatically)
- Add NUMBA_DISABLE_JIT=1 if not present

#### Step 3: Check Build Logs
Look for:
- Python version installation
- Dependency installation
- Build success/failure
- Start command execution

#### Step 4: Check Runtime Logs
Look for:
- "Starting server on port X"
- Any error messages
- Import errors
- Memory errors

#### Step 5: Test Locally First
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend

# Activate venv
venv\Scripts\activate

# Test with gunicorn (same as Railway)
gunicorn app_simple:app --bind 0.0.0.0:5000 --workers 2 --timeout 120

# Test health endpoint
curl http://localhost:5000/health
```

### Railway Configuration Checklist

- [ ] Correct directory selected (Phantom_Splice_Backend/Phantom_Splice_Backend)
- [ ] requirements.txt present and complete
- [ ] Procfile present with correct command
- [ ] railway.json present (optional but helpful)
- [ ] runtime.txt specifies Python 3.12.0
- [ ] app_simple.py reads PORT from environment
- [ ] CORS enabled in app_simple.py
- [ ] Deployment status is "Active"
- [ ] No errors in logs
- [ ] Health endpoint responds

### Manual Deployment Fix

If auto-deployment isn't working:

1. **Set Root Directory**
   - Railway Settings → General
   - Root Directory: `Phantom_Splice_Backend/Phantom_Splice_Backend`

2. **Set Start Command**
   - Railway Settings → Deploy
   - Start Command: `gunicorn app_simple:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120`

3. **Set Build Command** (if needed)
   - Build Command: `pip install -r requirements.txt`

4. **Redeploy**
   - Click "Deploy" button
   - Wait for build to complete
   - Check logs

### Testing After Fix

```bash
# 1. Health check
curl https://phantomsplice-production.up.railway.app/health

# 2. Image upload test
curl -X POST https://phantomsplice-production.up.railway.app/sever \
  -F "file=@test-image.jpg" \
  --output result.png

# 3. Check if result.png was created
ls -lh result.png
```

### Get Help

1. **Railway Logs**
   - Most issues show up in logs
   - Check both build and runtime logs

2. **Railway Discord**
   - https://discord.gg/railway
   - Community support

3. **Check Railway Status**
   - https://status.railway.app
   - Verify no platform issues

### Next Steps

1. Check Railway dashboard logs
2. Share error messages if any
3. Verify deployment status
4. Test health endpoint
5. Adjust configuration as needed

### Common Error Messages

**"No module named 'flask'"**
- Fix: Ensure requirements.txt is in correct location
- Redeploy

**"Address already in use"**
- Fix: Verify PORT environment variable usage
- Check app_simple.py

**"502 Bad Gateway"**
- Fix: App crashed, check logs
- Likely memory issue, upgrade plan

**"504 Gateway Timeout"**
- Fix: Increase timeout in Procfile
- Or reduce image size

**"Failed to bind to $PORT"**
- Fix: Ensure app uses os.environ.get('PORT')
- Check app_simple.py

## Quick Fix Commands

```bash
# Redeploy from CLI
railway up

# View logs
railway logs

# Check status
railway status

# Open in browser
railway open
```

## Status Indicators

- 🟢 **Active** - Deployment successful, app running
- 🟡 **Building** - Deployment in progress
- 🔴 **Failed** - Deployment failed, check logs
- ⚪ **Crashed** - App started but crashed, check logs

---

**Most Common Issue:** Memory limit on Hobby plan. Upgrade to Pro for reliable performance with rembg.
