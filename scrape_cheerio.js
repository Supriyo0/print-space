const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('kp_raw.html', 'utf8');
const $ = cheerio.load(html);

const products = [];
const seenTitles = new Set();

// Usually Kaagazprints uses <div class="col-lg-3 col-md-4 col-sm-6 col-6"> or similar 
// with an <a> tag and <img> tag for products. Let's find all images.

$('img').each((i, el) => {
    let src = $(el).attr('src');
    if (!src) return;

    // Find closest anchor or parent wrapper that might contain text
    let parentTag = $(el).parent('a');
    if (parentTag.length === 0) {
        parentTag = $(el).closest('.service-item, .product-item, .col-lg-3, .col-md-4, .col-md-3');
    }

    let title = parentTag.text().replace(/\s+/g, ' ').trim();
    if (!title || title.length < 3) {
        // Look for next sibling or h3/h4/h5 nearby
        title = $(el).closest('div').find(['h3', 'h4', 'h5', 'h6', 'span', 'p'].join(',')).first().text().replace(/\s+/g, ' ').trim();
    }

    if (title && title.length > 3 && src && src.includes('image/')) {
        let cleanTitle = title.replace(/Our Service|Know More|Read More/ig, '').trim();
        if (cleanTitle && !seenTitles.has(cleanTitle) && cleanTitle.length > 2) {
            seenTitles.add(cleanTitle);

            if (!src.startsWith('http')) {
                src = 'https://kaagazprints.com/' + src.replace(/^\.?\/*/, '');
            }

            // Categorize loosely based on keywords
            let cat = 'marketing';
            let tLower = cleanTitle.toLowerCase();
            if (tLower.includes('t-shirt') || tLower.includes('polo') || tLower.includes('wear') || tLower.includes('cap') || tLower.includes('hoodie')) cat = 'apparel';
            else if (tLower.includes('sticker') || tLower.includes('label')) cat = 'stickers';
            else if (tLower.includes('card') || tLower.includes('notebook') || tLower.includes('pad') || tLower.includes('letter') || tLower.includes('diary')) cat = 'stationery';
            else if (tLower.includes('box') || tLower.includes('bag') || tLower.includes('packaging')) cat = 'packaging';
            else if (tLower.includes('mug') || tLower.includes('pen') || tLower.includes('lanyard') || tLower.includes('gift') || tLower.includes('award') || tLower.includes('badge')) cat = 'gifts';
            else if (tLower.includes('photo') || tLower.includes('album') || tLower.includes('canvas')) cat = 'photo';
            
            // create id
            let id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            products.push({
                id: id,
                cat: cat,
                title: cleanTitle,
                desc: "High-grade industrial masterpiece crafted specifically for " + cleanTitle + " requirements.",
                image: src,
                bentoSize: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'bento-large' : 'bento-wide') : 'bento-standard',
                variants: [{ name: "Standard Base", price: "Custom" }],
                features: ["Premium Finish", "High Precision", "Industrial Use"],
                specs: { "Grade": "A+", "Tolerance": "Zero", "Lifespan": "Extended" }
            });
        }
    }
});

console.log('Extracted', products.length, 'products');
fs.writeFileSync('all_kaagazprints_products.json', JSON.stringify(products, null, 2));

// Generate the new JS mapping
let outputCode = `
const products = ${JSON.stringify(products, null, 4)};\n
// APPEND TO data.js manually!
`;
fs.writeFileSync('injections.js', outputCode);
