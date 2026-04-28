"""批量生成画廊缩略图 (宽 600px, WebP quality 82).

用法: python generate_thumbs.py
跳过已存在同名 -thumb.webp 的文件。
"""
import os, sys
from PIL import Image

ART = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "art")

def main():
    files = [f for f in os.listdir(ART) if f.endswith('.webp') and '-thumb' not in f]
    if not files:
        print("没有需要处理的文件。")
        return

    for f in sorted(files):
        src = os.path.join(ART, f)
        name, _ = os.path.splitext(f)
        dst = os.path.join(ART, f"{name}-thumb.webp")
        if os.path.exists(dst):
            print(f"跳过 {f} (缩略图已存在)")
            continue

        img = Image.open(src)
        img.thumbnail((600, 99999), Image.LANCZOS)
        img.save(dst, "WEBP", quality=82)
        old = os.path.getsize(src) / 1024
        new = os.path.getsize(dst) / 1024
        print(f"{f}: {old:.0f}KB -> {new:.0f}KB ({img.size[0]}x{img.size[1]})")

    print("完成。")

if __name__ == "__main__":
    main()
