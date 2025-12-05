# 📖 How to Load Phantom Crop in Chrome

## Step-by-Step Visual Guide

### Step 1: Open Chrome Extensions Page
```
Type in address bar: chrome://extensions/
OR
Menu (⋮) → Extensions → Manage Extensions
```

### Step 2: Enable Developer Mode
```
Look at the TOP RIGHT corner
Toggle "Developer mode" to ON (blue)
```

### Step 3: Load Unpacked Extension
```
Click the "Load unpacked" button (appears after enabling dev mode)
```

### Step 4: Select the Dist Folder
```
Navigate to your project folder:
→ phantom-slice
  → dist  ← SELECT THIS FOLDER

Click "Select Folder"
```

### Step 5: Verify Extension Loaded
```
You should see:
- Phantom Crop card in extensions list
- Red ghost icon 👻
- Extension ID
- "Errors" button (should show 0 errors)
```

### Step 6: Pin Extension (Optional)
```
Click the puzzle piece icon (🧩) in Chrome toolbar
Find "Phantom Crop"
Click the pin icon to keep it visible
```

### Step 7: Test It!
```
1. Click the Phantom Crop icon in toolbar
2. Extension popup opens
3. Toggle "LIVE CONNECTION" mode
4. Upload an image
5. Background removed! 🎉
```

---

## 🎯 Quick Checklist

Before loading:
- [ ] Backend is running (http://localhost:5000)
- [ ] `phantom-slice/dist` folder exists
- [ ] `manifest.json` is in dist folder
- [ ] Icons are in dist folder

After loading:
- [ ] Extension appears in chrome://extensions/
- [ ] No errors shown
- [ ] Icon appears in toolbar
- [ ] Clicking icon opens popup

---

## 🐛 Common Issues

### "Cannot load extension" error
**Fix:** Make sure you selected the `dist` folder, not `phantom-slice`

### "Manifest file is missing or unreadable"
**Fix:** Run `npm run build` in phantom-slice folder

### Extension loads but doesn't work
**Fix:** 
1. Check backend is running: `curl http://localhost:5000/health`
2. Toggle to "LIVE CONNECTION" mode
3. Check browser console for errors (F12)

### "Failed to fetch" error
**Fix:** 
1. Backend must be running
2. Check URL is http://localhost:5000/sever
3. Check CORS is enabled (should be by default)

---

## 🔄 Reload Extension After Changes

If you modify code:
1. Rebuild: `cd phantom-slice && npm run build`
2. Go to chrome://extensions/
3. Click the refresh icon (🔄) on Phantom Crop card
4. Test changes

---

## 📸 What You Should See

### Extensions Page
```
┌─────────────────────────────────────────┐
│ Phantom Crop                            │
│ Remove image backgrounds with a spooky  │
│ twist                                   │
│                                         │
│ ID: abc123...                           │
│ Version: 1.0.0                          │
│                                         │
│ [Details] [Remove] [Errors (0)]        │
└─────────────────────────────────────────┘
```

### Extension Popup
```
┌─────────────────────────────────────────┐
│         PHANTOM CROP                    │
│    SYSTEM FAILURE: DETECTED             │
│                                         │
│  [SIMULATION MODE] [LIVE CONNECTION]    │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │   Drag & Drop Image Here          │ │
│  │   or Click to Upload              │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Awaiting Biological Input...           │
└─────────────────────────────────────────┘
```

---

## ✅ Success Indicators

You'll know it's working when:
1. ✓ Extension icon appears in toolbar
2. ✓ Clicking icon opens spooky popup
3. ✓ "LIVE CONNECTION" button is clickable
4. ✓ Can upload images
5. ✓ Backend processes images (check terminal)
6. ✓ Processed image appears with transparent background

---

## 🎬 Ready to Demo!

Once loaded, your extension is ready to:
- Remove backgrounds from any image
- Show spooky animations
- Get AI spirit readings (if API key set)
- Download processed images

**Have fun at your hackathon!** 🎃👻
