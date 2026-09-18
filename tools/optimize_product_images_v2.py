#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps
import re, shutil, tempfile

ROOT=Path(__file__).resolve().parents[1]
BUILD="20260918-1454"
TARGETS={
  ROOT/"assets/images/catalog": 520,
  ROOT/"assets/images/products": 720,
}
EXTS={".png",".jpg",".jpeg",".webp"}

def alpha_state(im):
    return ("A" in im.getbands()) or ("transparency" in im.info)

def save_same_format(im, fmt, out):
    fmt=(fmt or "").upper()
    if fmt=="PNG":
        im.save(out, "PNG", optimize=True, compress_level=9)
    elif fmt=="JPEG":
        if im.mode not in ("RGB","L"):
            bg=Image.new("RGB", im.size, "white")
            if "A" in im.getbands(): bg.paste(im, mask=im.getchannel("A"))
            else: bg.paste(im)
            im=bg
        im.save(out, "JPEG", quality=84, optimize=True, progressive=True, subsampling=1)
    elif fmt=="WEBP":
        im.save(out, "WEBP", quality=84, method=6, exact=True)
    else:
        raise RuntimeError(f"unsupported format {fmt}")

before_total=after_total=changed=0
audit=[]
for folder,max_edge in TARGETS.items():
    for path in sorted(folder.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXTS: continue
        before=path.stat().st_size
        before_total+=before
        with Image.open(path) as src:
            fmt=src.format
            had_alpha=alpha_state(src)
            im=ImageOps.exif_transpose(src).copy()
            original_size=im.size
        if max(im.size)>max_edge:
            scale=max_edge/max(im.size)
            new_size=(max(1,round(im.width*scale)),max(1,round(im.height*scale)))
            im=im.resize(new_size,Image.Resampling.LANCZOS)
        else:
            new_size=im.size
        with tempfile.TemporaryDirectory() as td:
            out=Path(td)/path.name
            save_same_format(im,fmt,out)
            with Image.open(out) as chk:
                if chk.format != fmt:
                    raise RuntimeError(f"format changed: {path} {fmt}->{chk.format}")
                if had_alpha and not alpha_state(chk):
                    raise RuntimeError(f"alpha lost: {path}")
                out_size=chk.size
            after=out.stat().st_size
            # For resized images keep the resized output unless it grows >5%; otherwise only replace if smaller.
            should_replace=(new_size!=original_size and after<=before*1.05) or (after<before*0.97)
            if should_replace:
                shutil.copy2(out,path)
                changed+=1
            else:
                after=before
                out_size=original_size
        after_total+=after
        audit.append((str(path.relative_to(ROOT)),fmt,had_alpha,original_size,out_size,before,after))

# Cache-bust all static product/catalog image references.
pattern=re.compile(r'(assets/images/(?:catalog|products)/[^"\'\s)]+?\.(?:png|jpe?g|webp))(?:\?v=[^"\'\s)]+)?',re.I)
text_changed=[]
for path in sorted(ROOT.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in {".html",".js",".css",".json",".py"}: continue
    if any(part in {".git","node_modules"} for part in path.parts): continue
    try: text=path.read_text(encoding="utf-8")
    except Exception: continue
    new=pattern.sub(lambda m:f"{m.group(1)}?v={BUILD}",text)
    # Move CSS/JS release token off the stale 1010 cache key.
    new=new.replace("20260918-1454",BUILD)
    if new!=text:
        path.write_text(new,encoding="utf-8")
        text_changed.append(str(path.relative_to(ROOT)))

# Explicit audit for the known disguised PNG.
f=ROOT/"assets/images/products/fastech-ft-yx510.jpg?v=20260918-1454"
with Image.open(f) as im:
    print(f"FASTECH_FORMAT={im.format}")
    print(f"FASTECH_MODE={im.mode}")
    print(f"FASTECH_ALPHA={alpha_state(im)}")
    print(f"FASTECH_SIZE={im.width}x{im.height}")
    if im.format!="PNG" or not alpha_state(im):
        raise RuntimeError("Fastech authority check failed: must remain alpha PNG despite .jpg extension")

print(f"IMAGE_COUNT={len(audit)}")
print(f"IMAGE_CHANGED={changed}")
print(f"BEFORE_BYTES={before_total}")
print(f"AFTER_BYTES={after_total}")
print(f"SAVED_BYTES={before_total-after_total}")
print(f"SAVED_PERCENT={(before_total-after_total)/before_total*100:.2f}")
print(f"TEXT_FILES_VERSIONED={len(text_changed)}")
print("LARGEST_AFTER:")
for row in sorted(audit,key=lambda x:x[6],reverse=True)[:15]:
    print(f"{row[0]} | {row[1]} alpha={row[2]} | {row[3]}->{row[4]} | {row[5]}->{row[6]}")
