"""Generate simple icons for Chrome extension"""
from PIL import Image, ImageDraw

def create_icon(size):
    # Create image with dark background
    img = Image.new('RGBA', (size, size), (5, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Draw red circle (ghost/phantom)
    margin = size // 6
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(255, 0, 0, 255))
    
    # Draw eyes
    eye_size = size // 10
    eye_y = size // 2 - eye_size
    left_eye_x = size // 3
    right_eye_x = 2 * size // 3
    
    draw.rectangle([left_eye_x - eye_size//2, eye_y, 
                   left_eye_x + eye_size//2, eye_y + eye_size], 
                   fill=(5, 0, 0, 255))
    draw.rectangle([right_eye_x - eye_size//2, eye_y, 
                   right_eye_x + eye_size//2, eye_y + eye_size], 
                   fill=(5, 0, 0, 255))
    
    return img

# Generate all required sizes
for size in [16, 48, 128]:
    icon = create_icon(size)
    icon.save(f'icon{size}.png')
    icon.save(f'dist/icon{size}.png')
    print(f'Created icon{size}.png')

print('All icons generated!')
