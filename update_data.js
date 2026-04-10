const fs = require('fs');
const { businessInfo, categories, products: curatedProducts } = require('./src/data.js');

const allKaagazProducts = JSON.parse(fs.readFileSync('all_kaagazprints_products.json', 'utf8'));

// We want to use the curated products first because they have good descriptions
// Then we add any from allKaagazProducts that aren't in curatedProducts

const curatedMap = {};
curatedProducts.forEach(p => curatedMap[p.id] = p);

const combinedProducts = [...curatedProducts];

allKaagazProducts.forEach(p => {
    // Avoid "stay-organized-with" and "wear-your-brand-with-pride" as they look like banners
    if (p.id === 'stay-organized-with' || p.id === 'wear-your-brand-with-pride') return;
    
    // Add if not already curated
    if (!curatedMap[p.id]) {
        combinedProducts.push(p);
    }
});

// Now generate the data.js content
const output = `const businessInfo = ${JSON.stringify(businessInfo, null, 4)};

const categories = ${JSON.stringify(categories, null, 4)};

const products = ${JSON.stringify(combinedProducts, null, 4)};

module.exports = { businessInfo, categories, products };
`;

fs.writeFileSync('src/data.js', output);
console.log('✅ Updated src/data.js with ' + combinedProducts.length + ' products.');
