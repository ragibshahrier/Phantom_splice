# Build Chrome Extension

## Quick Setup

### 1. Install Dependencies
```bash
cd phantom-slice
npm install
```

### 2. Build Extension
```bash
npm run build
```

### 3. Copy manifest to dist
```bash
# Windows
copy manifest.json dist\
# Linux/Mac
cp manifest.json dist/
```

### 4. Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `phantom-slice/dist` folder
5. The extension icon should appear in your toolbar

## Backend Setup

### 1. Start Backend Server
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python app.py
```

Backend runs at `http://localhost:5000`

### 2. Test Backend
```bash
cd phantom-slice
python test_backend.py
```

## Usage
1. Make sure backend is running (`python app.py`)
2. Click extension icon in Chrome
3. Toggle "LIVE CONNECTION" mode
4. Upload an image to remove background

## Troubleshooting
- If CORS errors: Backend has CORS enabled, check console
- If API key missing: Add GEMINI_API_KEY to .env.local
- If extension doesn't load: Check manifest.json is in dist/
