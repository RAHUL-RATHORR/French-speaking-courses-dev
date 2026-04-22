import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
const files = fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|webp|jfif)$/i.test(f));

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery - French Skill</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; bg: #f9fafb; color: #111827; }
        h1 { text-align: center; color: #002654; margin-bottom: 40px; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 30px; }
        .card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 15px; text-align: center; border: 1px solid #e5e7eb; transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; border: 1px solid #f3f4f6; }
        .filename { margin-top: 15px; font-size: 14px; color: #374151; word-break: break-all; font-weight: 500; background: #f3f4f6; padding: 8px; border-radius: 6px; }
        .copy-btn { margin-top: 10px; cursor: pointer; background: #002654; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
    </style>
</head>
<body>
    <h1>🖼️ Your Uploaded Images</h1>
    <p style="text-align:center; color:#6b7280; margin-bottom:30px;">In images ko dekh lijiye aur mujhe batayein ki kaunsa filename kis course ke liye hai.</p>
    <div class="gallery">
        ${files.map(f => `
            <div class="card">
                <img src="/api/uploads/${f}" alt="${f}">
                <div class="filename">${f}</div>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('${f}')">Copy Filename</button>
            </div>
        `).join('')}
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'gallery.html'), html);
console.log('Gallery created at: public/gallery.html');
