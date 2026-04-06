const fs = require('fs');
const path = require('path');
const { businessInfo, categories, products } = require('./src/data.js');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');
const templatesDir = path.join(srcDir, 'templates');

// Utility to read template
const readTemplate = (name) => fs.readFileSync(path.join(templatesDir, `${name}.html`), 'utf8');

const layoutTemplate = readTemplate('layout');
const homeTemplate = readTemplate('home');
const categoryTemplate = readTemplate('category');
const productTemplate = readTemplate('product');

// Ensure dist structure
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
if (!fs.existsSync(path.join(distDir, 'styles'))) fs.mkdirSync(path.join(distDir, 'styles'));
if (!fs.existsSync(path.join(distDir, 'images'))) fs.mkdirSync(path.join(distDir, 'images'));

// Helper to wrap content in layout
function wrap(content, title, rootPath = '') {
    const kolkata = businessInfo.locations.find(l => l.city === 'Kolkata (H.O)');
    const delhi = businessInfo.locations.find(l => l.city === 'New Delhi (B.O)');
    
    return layoutTemplate
        .replace(/{{Content}}/g, content)
        .replace(/{{Title}}/g, title)
        .replace(/{{RootPath}}/g, rootPath)
        .replace(/{{OwnerName}}/g, businessInfo.owner)
        .replace(/{{KolkataAddress}}/g, kolkata.address)
        .replace(/{{KolkataContact}}/g, kolkata.contact)
        .replace(/{{DelhiAddress}}/g, delhi.address)
        .replace(/{{DelhiContact}}/g, delhi.contact);
}

// Generate Category Card HTML
function genCategoryCard(cat) {
    return `
        <a href="${cat.id}.html" class="card reveal">
            <div class="card-img-bg">
                <img src="${cat.image}" alt="${cat.title}">
            </div>
            <div class="card-top">
                <div class="card-icon" style="color: ${cat.color};">
                    <i class="ph-fill ${cat.icon}"></i>
                </div>
                <h2>${cat.title}</h2>
                <p>${cat.subtitle}</p>
                <div class="card-footer">
                    DISCOVER MASTERPIECE <i class="ph ph-arrow-right"></i>
                </div>
            </div>
        </a>
    `;
}

function genProductCard(p, rootPath = '') {
    const parentCat = categories.find(c => c.id === p.cat);
    const pImage = p.image || parentCat.image;
    return `
        <a href="${rootPath}${p.id}.html" class="card product-card reveal">
            <div class="p-card-image">
                <img src="${rootPath}${pImage}" alt="${p.title}">
            </div>
            <div class="p-card-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="p-card-bottom">
                    <span class="p-card-price">${p.variants[0].price}</span>
                    <button class="btn btn-primary p-card-btn">Order Now</button>
                </div>
            </div>
        </a>
    `;
}

// 1. HOME PAGE
const homeContent = homeTemplate
    .replace(/{{CategoryCards}}/g, categories.map(genCategoryCard).join(''))
    .replace(/{{ClientsStat}}/g, businessInfo.stats.clients)
    .replace(/{{OrdersStat}}/g, businessInfo.stats.orders)
    .replace(/{{ExpStat}}/g, businessInfo.stats.experience)
    .replace(/{{ProjectsStat}}/g, businessInfo.stats.projects);

fs.writeFileSync(path.join(distDir, 'index.html'), wrap(homeContent, 'Home'));

// 2. CATALOG PAGE (All products)
const catalogContent = categoryTemplate
    .replace(/{{CategoryTitle}}/g, 'The 2026 Master Catalog')
    .replace(/{{CategorySubtitle}}/g, 'Every enterprise printing service available at our Kolkata & Delhi factories.')
    .replace(/{{CategoryImage}}/g, 'images/commercial_printing_showcase.png')
    .replace(/{{ProductCards}}/g, products.map(p => genProductCard(p)).join(''));
fs.writeFileSync(path.join(distDir, 'catalog.html'), wrap(catalogContent, 'Catalog'));

// 3. CATEGORY PAGES
categories.forEach(cat => {
    const catProducts = products.filter(p => p.cat === cat.id);
    const catContent = categoryTemplate
        .replace(/{{CategoryTitle}}/g, cat.title)
        .replace(/{{CategorySubtitle}}/g, cat.subtitle)
        .replace(/{{CategoryImage}}/g, cat.image)
        .replace(/{{ProductCards}}/g, catProducts.map(p => genProductCard(p)).join(''));
    fs.writeFileSync(path.join(distDir, `${cat.id}.html`), wrap(catContent, cat.title));
});

// 4. PRODUCT PAGES
products.forEach(p => {
    const parentCat = categories.find(c => c.id === p.cat);
    const featuresHtml = p.features.map(f => `<li><i class="ph ph-check"></i> ${f}</li>`).join('');
    
    // Technical Specs Logic
    const specsHtml = Object.entries(p.specs || {}).map(([key, val]) => `
        <tr>
            <td class="s-label">${key}</td>
            <td class="s-value">${val}</td>
        </tr>
    `).join('');

    // Variants Logic (V-Chips)
    const variantsHtml = p.variants.map((v, idx) => `
        <div class="v-chip ${idx === 0 ? 'active' : ''}" data-name="${v.name}" data-price="${v.price}">
            <span class="v-title">${v.name}</span>
            <span class="v-price">${v.price}</span>
        </div>
    `).join('');

    // Related Products Logic
    const relatedProducts = products
        .filter(rp => rp.cat === p.cat && rp.id !== p.id)
        .slice(0, 3)
        .map(rp => genProductCard(rp))
        .join('');

    const productImg = p.image || parentCat.image;

    const pContent = productTemplate
        .replace(/{{CategoryLink}}/g, `${parentCat.id}.html`)
        .replace(/{{CategoryTitle}}/g, parentCat.title.toUpperCase())
        .replace(/{{ProductTitle}}/g, p.title)
        .replace(/{{ProductDesc}}/g, p.desc)
        .replace(/{{ProductImage}}/g, productImg)
        .replace(/{{ProductFeatures}}/g, featuresHtml)
        .replace(/{{ProductSpecs}}/g, specsHtml)
        .replace(/{{ProductVariants}}/g, variantsHtml)
        .replace(/{{RelatedProducts}}/g, relatedProducts);

    fs.writeFileSync(path.join(distDir, `${p.id}.html`), wrap(pContent, p.title));
});

// 5. SYNC ASSETS to Dist
if (fs.existsSync(path.join(srcDir, 'styles', 'main.css'))) {
    fs.copyFileSync(path.join(srcDir, 'styles', 'main.css'), path.join(distDir, 'styles', 'main.css'));
}

console.log('✅ Master Deluxe 2026 Build Synchronized in /dist');
