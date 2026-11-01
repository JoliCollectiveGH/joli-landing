"""Builds the landing hero images from the licensed master.

The master lives in Branding/licensed-images/haus-rucker-co and never enters this repo.
The photograph is served as it is, with no effect, at its native size. A portrait crop
is cut for phones.

    python3 scripts/make-hero.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT.parents[0] / "Branding/licensed-images/haus-rucker-co/giant-billiard-vienna-1970.jpg"
OUT = ROOT / "public"

src = Image.open(MASTER).convert("RGB")
w, h = src.size

# Desktop: the whole frame
src.save(OUT / "landing-hero.jpg", quality=86, optimize=True, progressive=True)

# Mobile: a portrait crop around the people and the sphere
crop_w = round(h * 0.78)
left = round(w * 0.12)
src.crop((left, 0, left + crop_w, h)).save(
    OUT / "landing-hero-mobile.jpg", quality=86, optimize=True, progressive=True
)

for f in ("landing-hero.jpg", "landing-hero-mobile.jpg"):
    p = OUT / f
    print(f, Image.open(p).size, f"{p.stat().st_size // 1024} KB")
