#!/usr/bin/env python3
"""Photos se location (GPS) aur baaki EXIF hata deta hai.
Use:  pip install pillow
      python strip-gps.py photos        -> saaf copies 'photos_clean/' mein banti hain
Asli photos ko chhedta nahi. Upload 'photos_clean' wali karein."""
import sys, pathlib
from PIL import Image, ImageOps
src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "photos")
dst = src.parent / (src.name + "_clean"); dst.mkdir(exist_ok=True)
n = 0
for p in sorted(src.rglob("*")):
    if p.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"): continue
    out = dst / p.relative_to(src); out.parent.mkdir(parents=True, exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(p))      # orientation pehle theek karo
    clean = Image.new(im.mode, im.size); clean.putdata(list(im.getdata()))  # metadata nahi jata
    kw = {"quality": 92} if p.suffix.lower() in (".jpg", ".jpeg", ".webp") else {}
    clean.save(out, **kw); n += 1; print("clean:", out)
print(f"Done: {n} photos -> {dst}")
