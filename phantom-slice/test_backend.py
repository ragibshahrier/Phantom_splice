"""
Quick test script for the Flask backend
"""
import requests
import sys
from pathlib import Path

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✓ Health check passed:", response.json())
            return True
        else:
            print("✗ Health check failed:", response.status_code)
            return False
    except Exception as e:
        print("✗ Health check error:", str(e))
        return False

def test_sever(image_path=None):
    """Test image processing endpoint"""
    # Create a simple test image if none provided
    if not image_path:
        from PIL import Image
        import io
        img = Image.new('RGB', (100, 100), color='red')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        files = {'file': ('test.png', img_bytes, 'image/png')}
    else:
        with open(image_path, 'rb') as f:
            files = {'file': f}
    
    try:
        response = requests.post('http://localhost:5000/sever', files=files, timeout=30)
        if response.status_code == 200:
            print("✓ Image processing passed, received", len(response.content), "bytes")
            return True
        else:
            print("✗ Image processing failed:", response.status_code, response.text)
            return False
    except Exception as e:
        print("✗ Image processing error:", str(e))
        return False

if __name__ == '__main__':
    print("Testing Phantom Splice Backend...")
    print("-" * 40)
    
    health_ok = test_health()
    sever_ok = test_sever()
    
    print("-" * 40)
    if health_ok and sever_ok:
        print("✓ All tests passed!")
        sys.exit(0)
    else:
        print("✗ Some tests failed")
        sys.exit(1)
