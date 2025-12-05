"""
Comprehensive test suite for Phantom Crop
Tests backend, frontend build, and integration
"""
import requests
import sys
from pathlib import Path
from PIL import Image
import io

def print_header(text):
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def test_backend_health():
    """Test backend health endpoint"""
    print("\n[1/4] Testing Backend Health...")
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"  ✓ Health check passed")
            print(f"    Status: {data.get('status')}")
            print(f"    Message: {data.get('message')}")
            return True
        else:
            print(f"  ✗ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("  ✗ Cannot connect to backend")
        print("    Make sure backend is running: python app_simple.py")
        return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def test_backend_sever():
    """Test background removal endpoint"""
    print("\n[2/4] Testing Background Removal...")
    try:
        # Create a test image (red square)
        img = Image.new('RGB', (200, 200), color='red')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        files = {'file': ('test.png', img_bytes, 'image/png')}
        response = requests.post('http://localhost:5000/sever', files=files, timeout=30)
        
        if response.status_code == 200:
            result_size = len(response.content)
            print(f"  ✓ Background removal successful")
            print(f"    Received: {result_size:,} bytes")
            print(f"    Content-Type: {response.headers.get('Content-Type')}")
            
            # Verify it's a valid PNG
            try:
                result_img = Image.open(io.BytesIO(response.content))
                print(f"    Image size: {result_img.size}")
                print(f"    Image mode: {result_img.mode}")
                return True
            except Exception as e:
                print(f"  ✗ Invalid image returned: {e}")
                return False
        else:
            print(f"  ✗ Request failed: {response.status_code}")
            print(f"    Response: {response.text}")
            return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def test_frontend_build():
    """Test frontend build artifacts"""
    print("\n[3/4] Testing Frontend Build...")
    
    dist_path = Path('phantom-slice/dist')
    if not dist_path.exists():
        print("  ✗ Dist folder not found")
        print("    Run: cd phantom-slice && npm run build")
        return False
    
    print(f"  ✓ Dist folder exists")
    
    # Check required files
    required_files = {
        'index.html': 'Main HTML file',
        'manifest.json': 'Chrome extension manifest',
        'assets/main.js': 'Bundled JavaScript'
    }
    
    all_found = True
    for file, description in required_files.items():
        file_path = dist_path / file
        if file_path.exists():
            size = file_path.stat().st_size
            print(f"  ✓ {file} ({size:,} bytes)")
        else:
            print(f"  ✗ {file} missing")
            all_found = False
    
    return all_found

def test_cors():
    """Test CORS headers"""
    print("\n[4/4] Testing CORS Configuration...")
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        
        if cors_header == '*':
            print(f"  ✓ CORS enabled: {cors_header}")
            return True
        else:
            print(f"  ✗ CORS not properly configured: {cors_header}")
            return False
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    print_header("PHANTOM CROP - TEST SUITE")
    
    # Run all tests
    results = {
        'Backend Health': test_backend_health(),
        'Background Removal': test_backend_sever(),
        'Frontend Build': test_frontend_build(),
        'CORS Configuration': test_cors()
    }
    
    # Summary
    print_header("TEST RESULTS")
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"  {status}  {test_name}")
    
    print(f"\n  Score: {passed}/{total} tests passed")
    
    if passed == total:
        print_header("✓ ALL TESTS PASSED!")
        print("\n  Your Phantom Crop system is ready!")
        print("\n  Next Steps:")
        print("  1. Open Chrome and go to chrome://extensions/")
        print("  2. Enable 'Developer mode' (top right)")
        print("  3. Click 'Load unpacked'")
        print("  4. Select the 'phantom-slice/dist' folder")
        print("  5. Click the extension icon and upload an image!")
        print("\n  Backend is running at: http://localhost:5000")
        return 0
    else:
        print_header("✗ SOME TESTS FAILED")
        print("\n  Check the errors above and:")
        print("  - Make sure backend is running: python app_simple.py")
        print("  - Make sure frontend is built: npm run build")
        return 1

if __name__ == '__main__':
    sys.exit(main())
