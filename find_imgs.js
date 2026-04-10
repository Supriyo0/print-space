const fs = require('fs');
const html = fs.readFileSync('kp_raw.html', 'utf8');

const regex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
const imgs = new Set();
while ((match = regex.exec(html)) !== null) {
  imgs.add(match[1]);
}

console.log(Array.from(imgs).slice(0, 30).join('\n'));
