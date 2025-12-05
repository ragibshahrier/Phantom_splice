# 🚀 PHANTOM CROP - DEPLOYMENT GUIDE

## Deployment Options

You have several options for deploying your Phantom Crop project:

1. **Chrome Extension** → Chrome Web Store (Public)
2. **Backend** → Cloud hosting (Render, Railway, Heroku, etc.)
3. **Quick Demo** → Keep local backend, share extension

---

## 🎯 Recommended: Quick Hackathon Deployment

### Option A: Local Backend + Shared Extension

**Best for:** Hackathons, demos, quick sharing

**Steps:**
1. Keep backend running locally
2. Package extension for sharing
3. Share .zip file with judges/users
4. They load unpacked extension

**Pros:** Fast, free, no cloud setup needed  
**Cons:** Backend only accessible on your network

---

## 📦 PART 1: Deploy Chrome Extension

### Option 1: Chrome Web Store (Public - Takes 1-3 days)

#### Prerequisites
- Google account
- $5 one-time developer fee
- Privacy policy (if collecting data)

#### Steps

**1. Prepare Extension**
```bash
cd phantom-slice
npm run build
```

**2. Create ZIP file**
```bash
# Windows PowerShell
Compress-Archive -Path dist\* -DestinationPath phantom-crop-extension.zip

# Or manually:
# - Go to phantom-slice/dist/
# - Select all files
# - Right-click → Send to → Compressed folder
```

**3. Register as Chrome Developer**
- Go to: https://chrome.google.com/webstore/devconsole
- Pay $5 one-time fee
- Verify email

**4. Upload Extension**
- Click "New Item"
- Upload `phantom-crop-extension.zip`
- Fill in details:
  - **Name:** Phantom Crop
  - **Description:** Remove image backgrounds with AI
  - **Category:** Productivity
  - **Language:** English
  - **Screenshots:** Take 1-5 screenshots (1280x800 or 640x400)
  - **Icon:** Use icon128.png

**5. Privacy & Permissions**
- **Privacy Policy:** Required if using external APIs
- **Permissions Justification:** Explain why you need host_permissions
- **Single Purpose:** "Remove image backgrounds"

**6. Submit for Review**
- Click "Submit for Review"
- Wait 1-3 days for approval
- Check email for status

---

### Option 2: Share Unpacked (Instant - For Hackathons)

**Best for:** Quick demos, hackathon judges, testing

#### Steps

**1. Create Distribution Package**
```bash
cd phantom-slice
npm run build
```

**2. ZIP the dist folder**
```bash
# Windows
Compress-Archive -Path dist -DestinationPath phantom-crop-v1.0.zip
```

**3. Share Instructions**

Create a file called `INSTALL_INSTRUCTIONS.txt`:
```
PHANTOM CROP - Installation Instructions

1. Download and extract phantom-crop-v1.0.zip
2. Open Chrome and go to: chrome://extensions/
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked"
5. Select the extracted "dist" folder
6. Extension is now installed!

Note: Backend must be running for full functionality.
Toggle "SIMULATION MODE" to test without backend.
```

**4. Share Files**
- Upload to Google Drive / Dropbox
- Share link with judges/users
- Include backend URL if deployed

---

## 🖥️ PART 2: Deploy Backend

### Option 1: Render (Free Tier - Recommended)

**Best for:** Free hosting, easy setup, good for hackathons

#### Steps

**1. Prepare Backend**

Create `Phantom_Splice_Backend/Phantom_Splice_Backend/requirements_prod.txt`:
```txt
flask==3.0.0
flask-cors==4.0.0
rembg==2.0.57
pillow==10.1.0
gunicorn==21.2.0
```

**2. Create Render Config**

Create `Phantom_Splice_Backend/Phantom_Splice_Backend/render.yaml`:
```yaml
services:
  - type: web
    name: phantom-crop-backend
    env: python
    buildCommand: pip install -r requirements_prod.txt
    startCommand: gunicorn app_simple:app --bind 0.0.0.0:$PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.12.0
      - key: NUMBA_DISABLE_JIT
        value: 1
```

**3. Deploy to Render**

```bash
# 1. Create GitHub repo (if not already)
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# 2. Go to render.com
# 3. Sign up with GitHub
# 4. Click "New +" → "Web Service"
# 5. Connect your repository
# 6. Select: Phantom_Splice_Backend/Phantom_Splice_Backend
# 7. Settings:
#    - Name: phantom-crop-backend
#    - Environment: Python 3
#    - Build Command: pip install -r requirements_prod.txt
#    - Start Command: gunicorn app_simple:app --bind 0.0.0.0:$PORT
# 8. Click "Create Web Service"
# 9. Wait 5-10 minutes for deployment
```

**4. Get Your Backend URL**
```
Your backend will be at:
https://phantom-crop-backend.onrender.com
```

**5. Update Frontend**

Edit `phantom-slice/App.tsx`:
```typescript
const [config, setConfig] = useState<BackendConfig>({
  useMock: false,
  serverUrl: 'https://phantom-crop-backend.onrender.com/sever'  // ← Update this
});
```

**6. Rebuild Extension**
```bash
cd phantom-slice
npm run build
```

**7. Update manifest.json**

Edit `phantom-slice/manifest.json`:
```json
{
  "host_permissions": [
    "https://phantom-crop-backend.onrender.com/*",
    "https://generativelanguage.googleapis.com/*"
  ]
}
```

Rebuild again:
```bash
npm run build
```

---

### Option 2: Railway (Free Trial)

**1. Install Railway CLI**
```bash
npm install -g @railway/cli
```

**2. Login**
```bash
railway login
```

**3. Deploy**
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend
railway init
railway up
```

**4. Get URL**
```bash
railway domain
```

---

### Option 3: Heroku (Paid)

**1. Create Procfile**

Create `Phantom_Splice_Backend/Phantom_Splice_Backend/Procfile`:
```
web: gunicorn app_simple:app
```

**2. Deploy**
```bash
heroku login
heroku create phantom-crop-backend
git push heroku main
```

---

### Option 4: PythonAnywhere (Free Tier)

**1. Sign up:** https://www.pythonanywhere.com
**2. Upload files** via web interface
**3. Create web app** with Flask
**4. Configure WSGI** to point to app_simple.py
**5. Get URL:** `yourusername.pythonanywhere.com`

---

### Option 5: Google Cloud Run (Free Tier)

**1. Create Dockerfile**

Create `Phantom_Splice_Backend/Phantom_Splice_Backend/Dockerfile`:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV NUMBA_DISABLE_JIT=1
ENV PORT=8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app_simple:app
```

**2. Deploy**
```bash
gcloud run deploy phantom-crop \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Post-Deployment Configuration

### Update Extension with Backend URL

**1. Edit App.tsx**
```typescript
const [config, setConfig] = useState<BackendConfig>({
  useMock: false,
  serverUrl: 'https://YOUR-BACKEND-URL.com/sever'  // ← Your deployed URL
});
```

**2. Update manifest.json**
```json
{
  "host_permissions": [
    "https://YOUR-BACKEND-URL.com/*",
    "https://generativelanguage.googleapis.com/*"
  ]
}
```

**3. Rebuild**
```bash
cd phantom-slice
npm run build
```

---

## 📋 Deployment Checklist

### Before Deploying

- [ ] Test locally (all tests passing)
- [ ] Update backend URL in frontend
- [ ] Update manifest.json permissions
- [ ] Add environment variables (if needed)
- [ ] Test with deployed backend
- [ ] Take screenshots for store listing
- [ ] Write privacy policy (if needed)

### Backend Deployment

- [ ] Choose hosting platform
- [ ] Add production dependencies (gunicorn)
- [ ] Set environment variables
- [ ] Deploy and test
- [ ] Note down backend URL
- [ ] Test CORS from extension

### Extension Deployment

- [ ] Update backend URL in code
- [ ] Rebuild extension
- [ ] Test with deployed backend
- [ ] Create ZIP file
- [ ] Upload to Chrome Web Store OR
- [ ] Share unpacked version

---

## 🎯 Quick Hackathon Deployment (5 Minutes)

**For immediate demo/sharing:**

```bash
# 1. Keep backend running locally
cd Phantom_Splice_Backend/Phantom_Splice_Backend
venv\Scripts\python.exe app_simple.py

# 2. Build extension
cd ../../phantom-slice
npm run build

# 3. ZIP it
Compress-Archive -Path dist -DestinationPath phantom-crop.zip

# 4. Share phantom-crop.zip with instructions:
#    - Extract ZIP
#    - Load unpacked in Chrome
#    - Toggle "SIMULATION MODE" (works without backend)
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid |
|----------|-----------|------|
| **Render** | 750 hrs/month | $7/month |
| **Railway** | $5 credit | $5/month |
| **Heroku** | None | $7/month |
| **PythonAnywhere** | Limited | $5/month |
| **Google Cloud Run** | 2M requests/month | Pay per use |
| **Chrome Web Store** | $5 one-time | - |

---

## 🐛 Common Deployment Issues

### CORS Errors After Deployment

**Fix:** Make sure backend has CORS enabled:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # ← This line
```

### Extension Can't Connect to Backend

**Fix:** Update manifest.json host_permissions:
```json
"host_permissions": [
  "https://your-backend-url.com/*"
]
```

### Backend Times Out

**Fix:** Increase timeout in deployment config:
```yaml
# render.yaml
healthCheckPath: /health
```

### Large Model Download Fails

**Fix:** rembg downloads models on first run. Increase build timeout or pre-download models.

---

## 📊 Recommended Setup for Hackathon

### For Demo Day:

**Backend:** Render (free tier)
- Easy setup
- Reliable
- Free for hackathons
- Auto-deploys from GitHub

**Extension:** Unpacked sharing
- Instant distribution
- No review wait time
- Easy for judges to install
- Can update anytime

### For Public Release:

**Backend:** Google Cloud Run
- Scales automatically
- Pay per use
- Generous free tier

**Extension:** Chrome Web Store
- Professional
- Easy discovery
- Auto-updates
- Trusted by users

---

## 🚀 Deploy Now!

Choose your path:

**Fast (Hackathon):**
1. Keep backend local
2. ZIP extension
3. Share with judges
4. Demo ready in 5 minutes!

**Cloud (Production):**
1. Deploy backend to Render
2. Update extension URLs
3. Submit to Chrome Web Store
4. Live in 1-3 days!

---

## 📞 Quick Deploy Commands

```bash
# Build extension
cd phantom-slice && npm run build

# Create distribution ZIP
Compress-Archive -Path dist -DestinationPath phantom-crop.zip

# Test deployed backend
curl https://your-backend-url.com/health

# Rebuild after URL changes
npm run build
```

---

**Need help? Check the troubleshooting section or test locally first!**

Good luck with deployment! 🚀👻
