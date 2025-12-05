# Phantom Splice Backend

Python backend using rembg for background removal.

## Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

## Run

```bash
python app.py
```

Server runs at `http://localhost:5000`

## Endpoints

- `POST /sever` - Upload image, returns PNG with background removed
- `GET /health` - Health check

## Usage with Frontend

1. Start this backend: `python app.py`
2. In the Phantom-Splice extension, click "Live" mode (instead of "Mock")
3. Upload an image to remove its background
