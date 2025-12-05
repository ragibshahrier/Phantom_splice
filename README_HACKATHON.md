# 🎃 PHANTOM CROP - Hackathon Edition

> **Status: ✅ READY TO DEMO**  
> Backend: RUNNING | Frontend: BUILT | Tests: 4/4 PASSING

---

## 🚀 30-Second Setup

```bash
# 1. Backend is already running at http://localhost:5000 ✓

# 2. Load extension in Chrome:
#    - Open chrome://extensions/
#    - Enable "Developer mode"
#    - Click "Load unpacked"
#    - Select: phantom-slice/dist

# 3. Test it!
#    - Click extension icon
#    - Toggle "LIVE CONNECTION"
#    - Upload image → Background removed! 🎉
```

---

## 📁 Quick Reference

| Component | Status | Location |
|-----------|--------|----------|
| Backend | ✅ RUNNING | http://localhost:5000 |
| Frontend | ✅ BUILT | phantom-slice/dist/ |
| Extension | ✅ READY | Load dist/ in Chrome |
| Tests | ✅ PASSING | Run: `python run_tests.py` |

---

## 🎯 What It Does

**Phantom Crop** removes image backgrounds with a spooky twist:
- 🖼️ Upload any image
- 🤖 AI removes background (rembg)
- 👻 Spooky animated UI
- 💾 Download transparent PNG
- 🔮 AI spirit reading (optional)

---

## 🧪 Test It

```bash
python run_tests.py
```

Expected output:
```
✓ PASS  Backend Health
✓ PASS  Background Removal
✓ PASS  Frontend Build
✓ PASS  CORS Configuration

Score: 4/4 tests passed
```

---

## 📚 Documentation

- **QUICKSTART.md** - Fast setup guide
- **HACKATHON_READY.md** - Complete system overview
- **LOAD_EXTENSION_GUIDE.md** - How to load in Chrome
- **COMPLETION_SUMMARY.md** - What was done

---

## 🔧 Troubleshooting

### Extension won't load?
```bash
cd phantom-slice
npm run build
# Then reload in chrome://extensions/
```

### Backend not responding?
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend
venv\Scripts\python.exe app_simple.py
```

### Test everything:
```bash
python run_tests.py
```

---

## 🎬 Demo Flow

1. **Show Extension** - Click icon, show UI
2. **Upload Image** - Drag & drop or click
3. **Processing** - Spooky animations play
4. **Result** - Background removed!
5. **Download** - Save transparent PNG
6. **Spirit Reading** - AI describes the image

---

## 💻 Tech Stack

- **Backend:** Python, Flask, rembg (AI)
- **Frontend:** React, TypeScript, Vite
- **Extension:** Chrome Manifest V3
- **AI:** Google Gemini (optional)

---

## 📊 Performance

- Image processing: 2-5 seconds
- Supports: PNG, JPG, JPEG
- Output: PNG with alpha channel
- Max size: Limited by browser memory

---

## 🏆 Hackathon Tips

1. ✅ Keep backend terminal open
2. ✅ Test before presenting
3. ✅ Have sample images ready
4. ✅ Know the toggle (Live/Mock)
5. ✅ Check F12 console if issues

---

## 🎉 You're Ready!

Everything is set up, tested, and documented.  
Your Phantom Crop extension is ready to impress! 👻

**Good luck at your hackathon! 🚀**

---

## 📞 Quick Commands

```bash
# Test everything
python run_tests.py

# Rebuild extension
cd phantom-slice && npm run build

# Restart backend
cd Phantom_Splice_Backend/Phantom_Splice_Backend
venv\Scripts\python.exe app_simple.py

# Check backend
curl http://localhost:5000/health
```

---

**Made with 🎃 for hackathon success!**
