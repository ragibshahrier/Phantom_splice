from flask import Flask, request, send_file
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
        return {'error': 'No file provided'}, 400
    
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No file selected'}, 400
    
    try:
        # Read the input image
        input_image = Image.open(file.stream)
        
        # Remove background
        output_image = remove(input_image)
        
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
        return {'error': str(e)}, 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return {'status': 'alive', 'message': 'The spirits are ready'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
