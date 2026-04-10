const fs = require('fs');
const html = fs.readFileSync('kp_raw.html', 'utf8');

// The layout on kaagazprints homepage is a massive grid of products.
// Let's find all images inside "category-item" or similar divs.
// Actually, let's just find ALL <a> tags that wrap an <img> and some text.

const regex = /<a[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<img[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?(?:<h[1-6][^>]*>|<span>|<p>)(.*?)(?:<\/h[1-6]>|<\/span>|<\/p>)[\s\S]*?<\/a>/gi;

let match;
const products = [];
const seenUrls = new Set();

while ((match = regex.exec(html)) !== null) {
  let [_, link, imgSrc, title] = match;
  title = title.replace(/<[^>]+>/g, '').trim();
  if (title && imgSrc && !seenUrls.has(link)) {
    seenUrls.add(link);
    if (!imgSrc.startsWith('http')) {
        imgSrc = 'https://kaagazprints.com/' + imgSrc.replace(/^\.?\//, '');
    }
    products.push({ title, image: imgSrc, link });
  }
}

// Fallback search if the previous doesn't match their structure
if (products.length < 10) {
    const backupRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<h[3-6][^>]*><a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a><\/h[3-6]>/gi;
    while ((match = backupRegex.exec(html)) !== null) {
        let [_, imgSrc, link, title] = match;
        title = title.replace(/<[^>]+>/g, '').trim();
        if (title && imgSrc && !seenUrls.has(link)) {
            seenUrls.add(link);
            if (!imgSrc.startsWith('http')) {
                imgSrc = 'https://kaagazprints.com/' + imgSrc.replace(/^\.?\//, '');
            }
            products.push({ title, image: imgSrc, link });
        }
    }
}

// Fallback 2: <div class="col-...">... <img...> ... text
if (products.length < 10) {
    const blocks = html.split('class="col-');
    for (let b of blocks) {
        let imgMatch = b.match(/<img[^>]*src=["']([^"']+)["']/i);
        let linkMatch = b.match(/<a[^>]*href=["']([^"']+)["']/i);
        // Find text between tags or inside h4/p
        let textMatch = b.match(/<h[3-5][^>]*>[\s\S]*?(?:<a[^>]*>)?(.*?)<\/a>/i) || b.match(/class="title"[^>]*>[\s\S]*?(?:<a[^>]*>)?(.*?)<\/a>/i) || b.match(/>([^<>]{4,40})<\/a>/i);
        
        if (imgMatch && linkMatch && textMatch) {
            let imgSrc = imgMatch[1];
            let link = linkMatch[1];
            let title = textMatch[1].replace(/<[^>]+>/g, '').trim();
            if (title && !seenUrls.has(link)) {
                seenUrls.add(link);
                if (!imgSrc.startsWith('http')) {
                    imgSrc = 'https://kaagazprints.com/' + imgSrc.replace(/^\.?\//, '');
                }
                products.push({ title, image: imgSrc, link });
            }
        }
    }
}

console.log(JSON.stringify(products.slice(0, 5), null, 2));
console.log('Total extracted:', products.length);
fs.writeFileSync('parsed_all.json', JSON.stringify(products, null, 2));
