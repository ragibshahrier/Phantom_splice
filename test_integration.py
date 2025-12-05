"""
Integration test for Phantom Crop
Tests both backend and frontend connectivity
"""
import subprocess
import time
import requests
import sys
from pathlib import Path

def check_backend_running():
    """Check if backend is running"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=2)
        return response.status_code == 200
    except:
        return False

def test_backend():
    """Test backend endpoints"""
    print("\n=== Testing Backend ===")
    
    # Health check
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✓ Health endpoint working")
            print(f"  Response: {response.json()}")
        else:
            print(f"✗ Health endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Health endpoint error: {e}")
        return False
    
    # Test sever endpoint with dummy image
    try:
        from PIL import Image
        import io
        
        # Create test image
        img = Image.new('RGB', (100, 100), color='red')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        files = {'file': ('test.png', img_bytes, 'image/png')}
        response = requests.post('http://localhost:5000/sever', files=files, timeout=30)
        
        if response.status_code == 200:
            print(f"✓ Sever endpoint working")
            print(f"  Received {len(response.content)} bytes")
            return True
        else:
            print(f"✗ Sever endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Sever endpoint error: {e}")
        return False

def test_frontend_build():
    """Check if frontend can be built"""
    print("\n=== Testing Frontend Build ===")
    
    try:
        # Check if dist exists
        dist_path = Path('phantom-slice/dist')
        if dist_path.exists():
            print("✓ Dist folder exists")
            
            # Check for key files
            required_files = ['index.html', 'manifest.json']
            for file in required_files:
                if (dist_path / file).exists():
                    print(f"✓ {file} found")
                else:
                    print(f"✗ {file} missing")
                    return False
            return True
        else:
            print("✗ Dist folder not found. Run 'npm run build' first")
            return False
    except Exception as e:
        print(f"✗ Frontend check error: {e}")
        return False

def main():
    print("=" * 50)
    print("PHANTOM CROP - Integration Test")
    print("=" * 50)
    
    # Check if backend is running
    if not check_backend_running():
        print("\n⚠ Backend not running!")
        print("Start it with:")
        print("  cd Phantom_Splice_Backend/Phantom_Splice_Backend")
        print("  python app.py")
        print("\nSkipping backend tests...")
        backend_ok = False
    else:
        backend_ok = test_backend()
    
    frontend_ok = test_frontend_build()
    
    print("\n" + "=" * 50)
    print("RESULTS:")
    print(f"  Backend: {'✓ PASS' if backend_ok else '✗ FAIL'}")
    print(f"  Frontend: {'✓ PASS' if frontend_ok else '✗ FAIL'}")
    print("=" * 50)
    
    if backend_ok and frontend_ok:
        print("\n✓ All systems operational!")
        print("\nNext steps:")
        print("1. Load extension in Chrome (chrome://extensions/)")
        print("2. Enable Developer mode")
        print("3. Click 'Load unpacked' and select phantom-slice/dist")
        return 0
    else:
        print("\n✗ Some tests failed. Check errors above.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
