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
    return layoutTemplate
        .replace(/{{Content}}/g, content)
        .replace(/{{Title}}/g, title)
        .replace(/{{RootPath}}/g, rootPath);
}

// Generate Bento Product Card for Home Page (Asymmetric shapes)
function genBentoCard(p) {
    const sizeClass = p.bentoSize || 'bento-standard';
    return `
        <a href="${p.id}.html" class="bento-item ${sizeClass} reveal">
            <img src="${p.image}" class="bento-img" alt="${p.title}">
            <div class="bento-content">
                <div style="font-size: 0.6rem; color: var(--accent-gold); letter-spacing: 0.3em; text-transform: uppercase; font-weight: 900; margin-bottom: 10px;">Industrial Line</div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
        </a>
    `;
}

function genProductCard(p, rootPath = '') {
    const parentCat = categories.find(c => c.id === p.cat);
    const pImage = p.image || parentCat.image;
    
    // Luxury masonry staggered logic
    let bentoClass = '';
    if (p.bentoSize === 'bento-large') bentoClass = 'grid-column: span 2; grid-row: span 2;';
    else if (p.bentoSize === 'bento-wide') bentoClass = 'grid-column: span 2;';
    else if (p.bentoSize === 'bento-tall') bentoClass = 'grid-row: span 2;';
    
    // Apply masonry logic for screens bigger than 800px using a class or inline
    const bClassAttr = p.bentoSize ? ` ${p.bentoSize}` : '';

    const featurePills = (p.features || []).slice(0, 2).map(f =>
        `<span style="display:inline-block; padding: 4px 10px; background: rgba(184,150,12,0.06); border: 1px solid rgba(184,150,12,0.3); border-radius: 100px; font-size: 0.6rem; font-weight: 900; color: #a38200; letter-spacing: 0.08em; text-transform: uppercase; margin-right: 6px; box-shadow: 0 2px 8px rgba(184,150,12,0.05);">${f}</span>`
    ).join('');
    return `
        <a href="${rootPath}${p.id}.html" class="product-card reveal${bClassAttr}" data-cat="${p.cat}" style="
            background: linear-gradient(145deg, #ffffff, #fdfbf7);
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 28px;
            overflow: hidden;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03), inset 0 2px 0 rgba(255,255,255,0.8);
            transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s, border-color 0.6s;
        "
        onmouseover="this.style.transform='translateY(-12px) scale(1.02)';this.style.boxShadow='0 30px 60px rgba(0,0,0,0.08), 0 0 0 1.5px #b8960c, 0 10px 30px rgba(184,150,12,0.15)';this.style.borderColor='#b8960c'"
        onmouseout="this.style.transform='';this.style.boxShadow='0 10px 30px rgba(0,0,0,0.03), inset 0 2px 0 rgba(255,255,255,0.8)';this.style.borderColor='rgba(0,0,0,0.05)'">
            <div style="position: relative; height: 260px; overflow: hidden; background: #e8e4db;">
                <img src="${rootPath}${pImage}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; filter: brightness(0.95) contrast(1.05); transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);" onmouseover="this.style.transform='scale(1.12)'" onmouseout="this.style.transform='scale(1)'">
                <div style="position:absolute; top:18px; left:18px; background:rgba(255,255,255,0.95); backdrop-filter:blur(12px); border: 1px solid rgba(0,0,0,0.05); padding: 6px 14px; border-radius:100px; font-size:0.6rem; font-weight:900; color:#b8960c; text-transform:uppercase; letter-spacing:0.2em; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">${parentCat ? parentCat.title : ''}</div>
                <div style="position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(transparent, rgba(0,0,0,0.4)); pointer-events:none;"></div>
            </div>
            <div style="padding: 32px; flex: 1; display: flex; flex-direction: column; position: relative;">
                <h3 style="color: #1c1917; margin-bottom: 10px; font-size: 1.3rem; font-weight: 900; line-height: 1.25; letter-spacing: -0.02em;">${p.title}</h3>
                <p style="color: #6b635e; font-size: 0.9rem; margin-bottom: 22px; line-height: 1.6; flex:1; font-weight: 500;">${p.desc}</p>
                <div style="margin-bottom: 24px;">${featurePills}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 22px;">
                    <div>
                        <div style="font-size:0.6rem; color:#8c827a; text-transform:uppercase; letter-spacing:0.2em; font-weight:800; margin-bottom:4px;">Starting Base</div>
                        <div style="color: #b8960c; font-weight: 900; font-size: 1.3rem; font-family: 'Outfit', sans-serif;">${p.variants[0].price}<span style="font-size:0.7rem; font-weight:700; color:#8c827a;"> /unit</span></div>
                    </div>
                    <div style="background: linear-gradient(135deg, #1c1917, #2d2a27); color: #fff; padding: 12px 24px; border-radius: 100px; font-size: 0.72rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; box-shadow: 0 8px 20px rgba(0,0,0,0.15); transition: background 0.3s;" onmouseover="this.style.background='#b8960c'" onmouseout="this.style.background='linear-gradient(135deg, #1c1917, #2d2a27)'">View Project</div>
                </div>
            </div>
        </a>
    `;
}

// 1. HOME PAGE
const curatedBentoProducts = products.filter(p => ['bento-large', 'bento-wide', 'bento-tall'].includes(p.bentoSize) || p.specs).slice(0, 10);
const homeContent = homeTemplate
    .replace(/{{CategoryCards}}/g, curatedBentoProducts.map(genBentoCard).join('')) // Products as Bento
    .replace(/{{ClientsStat}}/g, businessInfo.stats.clients)
    .replace(/{{OrdersStat}}/g, businessInfo.stats.orders)
    .replace(/{{ExpStat}}/g, businessInfo.stats.experience)
    .replace(/{{ProjectsStat}}/g, businessInfo.stats.projects);

fs.writeFileSync(path.join(distDir, 'index.html'), wrap(homeContent, 'Master Artisan Home'));

// 2. CATALOG PAGE (All products)
const catalogContent = categoryTemplate
    .replace(/{{CategoryTitle}}/g, 'The Artisan Catalog')
    .replace(/{{CategorySubtitle}}/g, 'Every production line — a masterpiece of architectural precision and industrial fulfillment.')
    .replace(/{{CategoryImage}}/g, 'https://kaagazprints.com/image/home-page-image/visiting-card.jpg')
    .replace(/{{RootPath}}/g, '')
    .replace(/{{ProductCards}}/g, products.map(p => genProductCard(p)).join(''));
fs.writeFileSync(path.join(distDir, 'catalog.html'), wrap(catalogContent, 'Artisan Catalog'));

// 3. CATEGORY PAGES
categories.forEach(cat => {
    const catProducts = products.filter(p => p.cat === cat.id);
    const catContent = categoryTemplate
        .replace(/{{CategoryTitle}}/g, cat.title)
        .replace(/{{CategorySubtitle}}/g, cat.subtitle)
        .replace(/{{CategoryImage}}/g, cat.image)
        .replace(/{{RootPath}}/g, '')
        .replace(/{{ProductCards}}/g, catProducts.map(p => genProductCard(p)).join(''));
    fs.writeFileSync(path.join(distDir, `${cat.id}.html`), wrap(catContent, cat.title));
});

// 4. PRODUCT PAGES
products.forEach(p => {
    const parentCat = categories.find(c => c.id === p.cat);
    
    // Technical Specs Logic
    const specsHtml = Object.entries(p.specs || {}).map(([key, val]) => `
        <div style="background: rgba(0,0,0,0.025); border: 1px solid rgba(0,0,0,0.07); border-radius: 14px; padding: 18px 20px;">
            <div style="font-size: 0.62rem; color: #b8960c; text-transform: uppercase; font-weight: 900; letter-spacing: 0.2em; margin-bottom: 6px;">${key}</div>
            <div style="font-size: 1rem; color: #1c1917; font-weight: 700;">${val}</div>
        </div>
    `).join('');

    // Variants Logic
    const variantsHtml = p.variants.map((v, idx) => `
        <div class="v-chip ${idx === 0 ? 'active' : ''}" style="
            background: ${idx === 0 ? 'rgba(184,150,12,0.08)' : 'rgba(0,0,0,0.025)'};
            padding: 16px 20px; border-radius: 14px;
            border: ${idx === 0 ? '1.5px solid #b8960c' : '1px solid rgba(0,0,0,0.08)'};
            display: flex; justify-content: space-between; align-items: center;
            cursor: pointer; transition: all 0.3s;
        ">
            <span style="font-weight: 800; font-size: 0.9rem; color: #1c1917;">${v.name}</span>
            <span style="color: #b8960c; font-weight: 900; font-size: 1.05rem;">${v.price}<small style="font-size:0.65rem; color:#78716c; font-weight:600;"> /unit</small></span>
        </div>
    `).join('');

    // Related Products Logic
    const relatedProducts = products
        .filter(rp => rp.cat === p.cat && rp.id !== p.id)
        .slice(0, 3)
        .map(rp => genProductCard(rp))
        .join('');

    const pContent = productTemplate
        .replace(/{{CategoryLink}}/g, `${parentCat.id}.html`)
        .replace(/{{CategoryTitle}}/g, parentCat.title.toUpperCase())
        .replace(/{{ProductTitle}}/g, p.title)
        .replace(/{{ProductDesc}}/g, p.desc)
        .replace(/{{ProductImage}}/g, p.image)
        .replace(/{{ProductID}}/g, p.id.toUpperCase())
        .replace(/{{StartingPrice}}/g, p.variants[0].price)
        .replace(/{{ProductSpecs}}/g, specsHtml)
        .replace(/{{ProductVariants}}/g, variantsHtml)
        .replace(/{{RelatedProducts}}/g, relatedProducts);

    fs.writeFileSync(path.join(distDir, `${p.id}.html`), wrap(pContent, p.title));
});

// 5. SYNC ASSETS to Dist
if (fs.existsSync(path.join(srcDir, 'styles', 'main.css'))) {
    fs.copyFileSync(path.join(srcDir, 'styles', 'main.css'), path.join(distDir, 'styles', 'main.css'));
}

console.log('✅ Obsidian Forge Build Synchronized in /dist');
