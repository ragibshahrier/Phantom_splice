# Phantom Crop - Quick Start Guide

## 🚀 Fast Setup (Hackathon Mode)

### Step 1: Install Frontend Dependencies
```bash
cd phantom-slice
npm install
```

### Step 2: Build Chrome Extension
```bash
npm run build
```
This creates the `dist` folder with your extension.

### Step 3: Setup Backend
```bash
cd ../Phantom_Splice_Backend/Phantom_Splice_Backend

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Start Backend Server
```bash
python app.py
```
Keep this terminal open. Backend runs on `http://localhost:5000`

### Step 5: Load Extension in Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right)
4. Click "Load unpacked"
5. Navigate to and select `phantom-slice/dist` folder
6. Extension icon appears in toolbar!

### Step 6: Test It
1. Click the Phantom Crop extension icon
2. Toggle to "LIVE CONNECTION" mode
3. Upload an image
4. Watch the background get removed! 👻

## 🧪 Run Tests

### Test Backend (in backend folder):
```bash
cd phantom-slice
python test_backend.py
```

### Test Integration (from root):
```bash
python test_integration.py
```

### Test Frontend Connection:
Open `phantom-slice/test_frontend.html` in browser while backend is running.

## 📝 Project Structure
```
phantom-slice/           # Frontend (React + Vite)
├── dist/               # Built extension (load this in Chrome)
├── manifest.json       # Chrome extension config
└── ...

Phantom_Splice_Backend/ # Backend (Flask + rembg)
└── Phantom_Splice_Backend/
    ├── app.py         # Flask server
    └── ...
```

## ⚡ Quick Commands

**Build extension:**
```bash
cd phantom-slice && npm run build
```

**Start backend:**
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend && python app.py
```

**Test everything:**
```bash
python test_integration.py
```

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure venv is activated
- Install dependencies: `pip install -r requirements.txt`

**Extension won't load?**
- Check `dist/manifest.json` exists
- Rebuild: `npm run build`

**CORS errors?**
- Backend has CORS enabled by default
- Check backend is running on port 5000

**No background removal?**
- Toggle to "LIVE CONNECTION" mode in extension
- Check backend terminal for errors

## 🎯 Demo Flow
1. Backend running ✓
2. Extension loaded ✓
3. Click extension icon
4. Upload spooky image
5. Background vanishes! 👻
6. Get AI spirit reading (if Gemini API key set)

Good luck with your hackathon! 🚀
