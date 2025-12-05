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
    print("=" * 50)
    print("PHANTOM CROP BACKEND")
    print("=" * 50)
    print("Starting server on http://localhost:5000")
    print("Endpoints:")
    print("  GET  /health - Health check")
    print("  POST /sever  - Remove background")
    print("=" * 50)
    app.run(host='0.0.0.0', port=5000, debug=True)
