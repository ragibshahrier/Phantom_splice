# Deploy Phantom Crop to GitHub Pages

## Prerequisites

- GitHub account
- Git installed
- Repository created on GitHub

## Quick Deployment Steps

### Step 1: Initialize Git (if not already)

```bash
cd phantom-slice
git init
git add .
git commit -m "Initial commit - Phantom Crop web app"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `phantom-crop` (or your choice)
3. Don't initialize with README
4. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/phantom-crop.git

# Push code
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the app
- Create/update `gh-pages` branch
- Push to GitHub
- Deploy automatically

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Click **Pages** (left sidebar)
4. Under "Source", select: **Deploy from a branch**
5. Under "Branch", select: **gh-pages** and **/ (root)**
6. Click **Save**

### Step 6: Access Your Site

After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/phantom-crop/
```

## Alternative: Manual Deployment

If `npm run deploy` doesn't work:

```bash
# Build
npm run build

# Install gh-pages globally
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

## Configuration

### vite.config.ts
Already configured with:
```typescript
base: './'  // Relative paths for GitHub Pages
```

### package.json
Deploy script added:
```json
"deploy": "npm run build && gh-pages -d dist"
```

## Troubleshooting

### Issue: 404 on GitHub Pages

**Fix:** Check repository settings
- Settings → Pages
- Source: gh-pages branch
- Folder: / (root)

### Issue: Blank Page

**Fix:** Check base path in vite.config.ts
```typescript
base: './'  // Already set
```

### Issue: Deploy Command Fails

**Fix:** Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Issue: Backend Not Working

**Fix:** Railway backend must be deployed first
- Current: https://phantomsplice-production.up.railway.app/sever
- Make sure it's responding

## Update Deployment

To update your site:

```bash
# Make changes
# ...

# Commit
git add .
git commit -m "Update app"
git push

# Deploy
npm run deploy
```

## Custom Domain (Optional)

1. Buy a domain
2. Add CNAME file to `public/` folder:
```
yourdomain.com
```
3. Configure DNS:
   - Type: CNAME
   - Name: www
   - Value: YOUR_USERNAME.github.io
4. In GitHub Settings → Pages → Custom domain
5. Enter your domain

## Status

✅ Build configured for GitHub Pages
✅ Deploy script added
✅ gh-pages package installed
✅ Ready to deploy

## Deploy Now!

```bash
npm run deploy
```

Then visit: `https://YOUR_USERNAME.github.io/phantom-crop/`
