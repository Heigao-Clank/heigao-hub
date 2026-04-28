# 作品展示 · 操作指南

## 添加新作品

1. 把画作保存为 WebP 格式，放到本目录，命名规则：`作品名-年份.webp`
2. 生成缩略图（见下方）
3. 在 `index.html` 的 `.gallery-grid` 中插入卡片：

```html
<div class="gallery-item">
  <div class="gallery-img-wrap">
    <img src="./assets/art/作品名-thumb.webp"
         data-full="./assets/art/作品名.webp"
         alt="作品标题" width="600" height="高度" loading="lazy">
  </div>
  <div class="gallery-caption">
    <span class="gallery-name">作品标题</span>
    <span class="gallery-date">YYYY.MM.DD</span>
  </div>
</div>
```

`width="600"` 保持不变，`height` 填缩略图的实际像素高度。

## 生成缩略图

对单一文件：

```bash
python -c "
from PIL import Image
img = Image.open('assets/art/作品名.webp')
img.thumbnail((600, 99999), Image.LANCZOS)
img.save('assets/art/作品名-thumb.webp', 'WEBP', quality=82)
"
```

或批量处理本目录下所有缺失缩略图的文件，运行项目根目录下的：

```bash
python generate_thumbs.py
```

## 注意事项

- 原图建议宽 1200-2400px，WebP quality 85-90
- 缩略图统一宽 600px，quality 82
- 灯箱（lightbox）自动读取 `data-full` 加载高清原图
- 存量旧图没有缩略图也能正常显示（JS 回退到 `src`）
