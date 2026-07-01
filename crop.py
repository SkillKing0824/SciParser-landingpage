from PIL import Image, ImageChops

def trim(im):
    bg = Image.new("RGB", im.size, im.convert("RGB").getpixel((0,0)))
    diff = ImageChops.difference(im.convert("RGB"), bg)
    
    diff = diff.convert("L")
    diff = diff.point(lambda p: 255 if p > 5 else 0)
    
    bbox = diff.getbbox()
    if bbox:
        padding = 5
        bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(im.size[0], bbox[2] + padding),
            min(im.size[1], bbox[3] + padding)
        )
        return im.crop(bbox)
    return im

try:
    im = Image.open('f:/SciParser_Landing/sciparser-landing/public/logo.png')
    im = trim(im)
    im.save('f:/SciParser_Landing/sciparser-landing/public/logo.png')
    print("Cropped successfully")
except Exception as e:
    print(f"Error: {e}")
