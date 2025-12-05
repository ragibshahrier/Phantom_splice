"""
Simplified Flask backend for Phantom Crop
Uses rembg without pymatting to avoid numba cache issues
"""
import os
import sys

# Disable numba caching BEFORE any imports
os.environ['NUMBA_DISABLE_JIT'] = '1'
os.environ['NUMBA_CACHE_DIR'] = ''

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    """Root endpoint - Debug page."""
    html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Phantom Splice Backend</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Courier New', monospace;
                background: radial-gradient(circle at center, #0a0f0a 0%, #000000 100%);
                color: #00ff41;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                overflow: hidden;
            }
            .container {
                text-align: center;
                padding: 40px;
                border: 2px solid #00ff41;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.8);
                background: rgba(0, 0, 0, 0.8);
                max-width: 600px;
            }
            h1 {
                font-size: 3em;
                margin: 0;
                text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            .status {
                margin: 20px 0;
                font-size: 1.2em;
            }
            .endpoints {
                text-align: left;
                margin: 30px auto;
                padding: 20px;
                background: rgba(0, 20, 10, 0.5);
                border: 1px solid #00ff41;
                border-radius: 5px;
            }
            .endpoint {
                margin: 10px 0;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
            }
            .method {
                color: #39ff14;
                font-weight: bold;
            }
            a {
                color: #00ff41;
                text-decoration: none;
            }
            a:hover {
                text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
            }
            .biohazard {
                font-size: 4em;
                margin: 20px 0;
                animation: rotate 10s linear infinite;
            }
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="biohazard">☢</div>
            <h1>PHANTOM_SPLICE</h1>
            <div class="status">✅ Backend is ALIVE</div>
            
            <div class="endpoints">
                <h3>Available Endpoints:</h3>
                
                <div class="endpoint">
                    <span class="method">GET</span> <a href="/health">/health</a>
                    <div style="font-size: 0.9em; color: #00ff41; opacity: 0.7;">Health check endpoint</div>
                </div>
                
                <div class="endpoint">
                    <span class="method">POST</span> /sever
                    <div style="font-size: 0.9em; color: #00ff41; opacity: 0.7;">Remove background from image</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; font-size: 0.9em; opacity: 0.6;">
                Phantom Crop Background Removal Service<br>
                Status: Operational 🟢
            </div>
        </div>
    </body>
    </html>
    """
    return html

@app.route('/sever', methods=['POST'])
def sever_spirit():
    """Remove background from uploaded image."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        print(f"Processing image: {file.filename}")
        
        # Read the input image
        input_image = Image.open(file.stream)
        print(f"Image size: {input_image.size}, mode: {input_image.mode}")
        
        # Remove background (using fast model)
        output_image = remove(input_image, alpha_matting=False)
        print("Background removed successfully")
        
        # Save to bytes buffer
        img_buffer = io.BytesIO()
        output_image.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        
        return send_file(
            img_buffer,
            mimetype='image/png',
            as_attachment=False
        )
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'alive', 'message': 'The spirits are ready'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print("=" * 50)
    print("PHANTOM CROP BACKEND")
    print("=" * 50)
    print(f"Starting server on port {port}")
    print("Endpoints:")
    print("  GET  /health - Health check")
    print("  POST /sever  - Remove background")
    print("=" * 50)
    app.run(host='0.0.0.0', port=port, debug=False)
