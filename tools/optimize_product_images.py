#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps
import os, shutil, subprocess, tempfile

ROOT = Path(__file__).resolve().parents[1]
TARGETS = {
    ROOT / "assets/images/catalog": 640,
    ROOT / "assets/images/products": 900,
}
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def human(n):
    units=["B","KB","MB","GB"]
    v=float(n)
    for u in units:
        if v < 1024 or u == units[-1]:
            return f"{v:.1f} {u}"
        v/=1024

def resize(im, max_edge):
    if max(im.size) <= max_edge:
        return im
    scale=max_edge/max(im.size)
    size=(max(1,round(im.width*scale)), max(1,round(im.height*scale)))
    return im.resize(size, Image.Resampling.LANCZOS)

def save_jpeg(im, out):
    if im.mode not in ("RGB","L"):
        bg=Image.new("RGB", im.size, "white")
        if "A" in im.getbands():
            bg.paste(im, mask=im.getchannel("A"))
        else:
            bg.paste(im)
        im=bg
    im.save(out, "JPEG", quality=82, optimize=True, progressive=True, subsampling=1)

def save_webp(im, out):
    im.save(out, "WEBP", quality=82, method=6, exact=True)

def save_png(im, out, quality):
    raw=out.with_suffix(".raw.png")
    im.save(raw, "PNG", optimize=True, compress_level=9)
    q=f"{quality[0]}-{quality[1]}"
    cmd=["pngquant","--force","--skip-if-larger","--strip","--speed","1","--quality",q,"--output",str(out),str(raw)]
    try:
        subprocess.run(cmd, check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except FileNotFoundError:
        pass
    if not out.exists():
        shutil.move(raw,out)
    else:
        raw.unlink(missing_ok=True)

def process(path,max_edge):
    before=path.stat().st_size
    with Image.open(path) as src:
        im=ImageOps.exif_transpose(src)
        original_size=im.size
        im=resize(im,max_edge)
        resized=im.size != original_size
        with tempfile.TemporaryDirectory() as td:
            out=Path(td)/path.name
            ext=path.suffix.lower()
            if ext in (".jpg",".jpeg"):
                save_jpeg(im,out)
            elif ext==".webp":
                save_webp(im,out)
            elif ext==".png":
                quality=(72,90) if "catalog" in path.parts else (80,95)
                save_png(im,out,quality)
            else:
                return None
            after=out.stat().st_size
            # Only replace when there is a meaningful saving; resizing always qualifies if not larger.
            if after < before * 0.97 or (resized and after <= before):
                shutil.copy2(out,path)
                return before,after,original_size,im.size
    return before,before,original_size,original_size

def main():
    rows=[]
    before_total=0
    after_total=0
    changed=0
    for folder,max_edge in TARGETS.items():
        for path in sorted(folder.rglob("*")):
            if not path.is_file() or path.suffix.lower() not in EXTS:
                continue
            before=path.stat().st_size
            before_total+=before
            result=process(path,max_edge)
            after=path.stat().st_size
            after_total+=after
            if after < before:
                changed+=1
                rows.append((before-after,before,after,path.relative_to(ROOT)))
    rows.sort(reverse=True)
    print(f"IMAGE_COUNT={sum(1 for f in TARGETS for p in f.rglob('*') if p.is_file() and p.suffix.lower() in EXTS)}")
    print(f"CHANGED={changed}")
    print(f"BEFORE_BYTES={before_total}")
    print(f"AFTER_BYTES={after_total}")
    print(f"SAVED_BYTES={before_total-after_total}")
    pct=(before_total-after_total)/before_total*100 if before_total else 0
    print(f"SAVED_PERCENT={pct:.2f}")
    print(f"BEFORE={human(before_total)}")
    print(f"AFTER={human(after_total)}")
    print("TOP_SAVINGS:")
    for saved,before,after,path in rows[:20]:
        print(f"{path}: {human(before)} -> {human(after)} (-{human(saved)})")

if __name__=="__main__":
    main()
