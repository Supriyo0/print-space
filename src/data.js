const businessInfo = {
    name: 'Print Space India',
    owner: 'M. Rahman',
    locations: [
        { city: 'Kolkata (H.O)', address: 'Beadon Street, Near Girish Park Metro Station, Kolkata, WB-700006', contact: '+91 9876543210' },
        { city: 'New Delhi (B.O)', address: 'Building No.- B-143, Near Nathus Sweets, Okhla Industrial Area Phase 1, New Delhi-110020', contact: '+91 7982060969' }
    ],
    whatsapp: '917982060969',
    tagline: '2026 Enterprise Printing: Precision, Power, Perfection.',
    stats: { clients: '10,000+', orders: '25,000+', experience: '24 Years', projects: '150k+' }
};

const categories = [
    { id: 'commercial', title: 'Commercial', subtitle: 'Dynamic Enterprise Presence', color: '#00f2fe', icon: 'ph-briefcase', image: 'images/commercial_printing_showcase.png' },
    { id: 'photo', title: 'Photo & Display', subtitle: 'Immersive Visual Mastery', color: '#89f7fe', icon: 'ph-camera', image: 'images/photo_printing_showcase.png' },
    { id: 'corporate', title: 'Corporate Gifting', subtitle: 'Bespoke Executive Authority', color: '#667eea', icon: 'ph-gift', image: 'images/corporate_gifting_showcase.png' },
    { id: 'packaging', title: 'Custom Packaging', subtitle: 'Future of Unboxing Experiences', color: '#b721ff', icon: 'ph-package', image: 'images/custom_packaging_showcase.png' }
];

const products = [
    // Commercial
    { 
        id: 'business-cards', cat: 'commercial', title: 'Premium Business Cards', 
        desc: 'Precision-cut luxury cardstocks with tactile UV or metallic foil finishes.', 
        image: 'images/premium_business_card_detail.png', 
        features: ['350gsm Matte/Gloss', 'Raised Spot UV Option', 'Luxury Cardstock', 'Nano-Resolution Print'],
        specs: { weight: '300-450gsm', finish: 'Velvet/Matte/UV', turnaround: '24-48 Hours', minOrder: '100 Units' },
        variants: [
            { name: 'Standard (300gsm)', price: '₹499' }, 
            { name: 'Premium (350gsm MATTE)', price: '₹899' }, 
            { name: 'Elite (UV SPOT/FOIL)', price: '₹1499' }
        ] 
    },
    { 
        id: 'letterheads', cat: 'commercial', title: 'Executive Letterheads', 
        desc: 'Standard commercial stationery printed on elite 120gsm bond paper.', 
        image: 'images/letterheads_mockup.png', 
        features: ['100gsm Bond Paper', 'Inkjet Friendly', 'A4 Standard Size', 'Laser Precision Layout'],
        specs: { weight: '80gsm - 120gsm', finish: 'Bright White', turnaround: '3 Days', minOrder: '500 Units' },
        variants: [
            { name: 'Standard 100gsm', price: '₹799' }, 
            { name: 'Premium Executive 120gsm', price: '₹1299' },
            { name: 'Watermarked 120gsm', price: '₹2499' }
        ] 
    },
    { 
        id: 'brochures', cat: 'commercial', title: 'Multi-Fold Brochures', 
        desc: 'Advanced marketing pamphlets for intricate product showcases.', 
        image: 'images/brochures_mockup.png',
        features: ['170gsm Gloss Paper', 'Tri-fold Precision', 'Double-Sided Print', 'Velvet Smooth Finish'],
        specs: { weight: '130gsm - 220gsm', finish: 'Gloss/Silk/Matte', folds: 'Bi-fold/Tri-fold', minOrder: '500 Units' },
        variants: [
            { name: 'Standard Gloss 170gsm', price: '₹1499' }, 
            { name: 'Premium Velvet 220gsm', price: '₹2899' },
            { name: 'Laminated UV 170gsm', price: '₹3499' }
        ] 
    },
    { 
        id: 'bill-books', cat: 'commercial', title: 'GST Bill Books', 
        desc: 'Custom carbonless ledger and invoice books with reinforced binding.', 
        features: ['Carbonless paper', 'Custom Branding', 'Serial Numbering', 'Duplicate/Triplicate'],
        specs: { pages: '50/100 Sets', size: 'A4/A5', copies: '2 or 3 part', minOrder: '10 Books' },
        variants: [
            { name: 'Duplicate (1+1)', price: '₹1199' }, 
            { name: 'Triplicate (1+2)', price: '₹1999' }
        ] 
    },
    { 
        id: 'envelopes', cat: 'commercial', title: 'Company Envelopes', 
        desc: 'Branded stationery envelopes in all standard business sizes.', 
        image: 'images/envelopes_mockup.png',
        features: ['Self-Sealing Option', 'Standard Legal Sizes', 'High-density Paper', 'Consistent Branding'],
        specs: { size: '9x4/A4/A5/C5', finish: 'Non-transparent', glue: 'Peel & Seal', minOrder: '1000 Units' },
        variants: [
            { name: 'Standard White (9x4)', price: '₹699' }, 
            { name: 'Premium Kraft (9x4)', price: '₹999' },
            { name: 'Large A4 Window', price: '₹1899' }
        ] 
    },
    { 
        id: 'stickers', cat: 'commercial', title: 'Die-Cut Vinyl Stickers', 
        desc: 'Industrial-grade weatherproof stickers for heavy branding.', 
        image: 'images/stickers_mockup.png',
        features: ['Premium Vinyl stock', 'Custom Shape Cuts', 'UV Proof', 'Strong Adhesion'],
        specs: { material: 'Vinyl/PVC', finish: 'Gloss/Matte', adhesive: 'High-tack', minOrder: '500 Units' },
        variants: [
            { name: 'Standard Paper Labels', price: '₹349' }, 
            { name: 'Weatherproof White Vinyl', price: '₹899' },
            { name: 'Prismatic/Foil Vinyl', price: '₹1899' }
        ] 
    },
    { 
        id: 'catalogues', cat: 'commercial', title: 'Product Catalogues', 
        desc: 'Exquisite booklets for your entire line of products.', 
        features: ['Saddle-stitch Binding', 'Multi-page Config', 'Silk Paper Interior', 'High-impact Covers'],
        specs: { size: 'A4/A5', pages: '8 up to 48', binding: 'Saddle/Perfect', minOrder: '50 Units' },
        variants: [
            { name: 'Economy (8-page)', price: '₹4999' }, 
            { name: 'Standard (16-page)', price: '₹9999' },
            { name: 'Premium (24-page)', price: '₹14999' }
        ] 
    },
    { 
        id: 'flyers', cat: 'commercial', title: 'High-Volume Flyers', 
        desc: 'Budget-friendly marketing on vibrant 130gsm stock.', 
        features: ['130gsm Art Paper', 'Economical in bulk', 'Same-day Production', 'Full Color CMYK'],
        specs: { weight: '110gsm - 170gsm', finish: 'Gloss/Matte', size: 'A4/A5', minOrder: '1000 Units' },
        variants: [
            { name: 'Standard Gloss 110gsm', price: '₹899' }, 
            { name: 'Premium Art 150gsm', price: '₹1499' }
        ] 
    },
    // Photo
    { 
        id: 'wedding-albums', cat: 'photo', title: 'Luxury Wedding Albums', 
        desc: 'Seamless lay-flat books with silk-textured Nona-Sheets.', 
        image: 'images/luxury_wedding_album_detail.png', 
        features: ['Lay-flat Binding', 'Nona-Sheet Technology', 'Luxury Presentation Box', 'Anti-Fingerprint'],
        specs: { sheets: 'Silk Finish', binding: 'Flush Mount', cover: 'Acrylic/Leather', turnaround: '7 Days' },
        variants: [
            { name: 'Silk Series (20pg)', price: '₹4499' }, 
            { name: 'Velvet Royal (40pg)', price: '₹8499' }, 
            { name: 'Majestic Imperial (60pg)', price: '₹15999' }
        ] 
    },
    { 
        id: 'canvas-prints', cat: 'photo', title: 'Museum Canvas Prints', 
        desc: 'Fine-art canvas stretched over solid wooden gallery frames.', 
        features: ['UV Matte Finish', 'Museum Grade Canvas', 'FSC Wood Frames', 'Hanging Kits Included'],
        specs: { canvas: 'Cotton 380gsm', finish: 'UV Protected', frame: 'Pinewood', minOrder: '1 Unit' },
        variants: [
            { name: 'Standard (12x18)', price: '₹1499' }, 
            { name: 'Large Gallery (24x36)', price: '₹3999' }
        ] 
    },
    { 
        id: 'flex-banners', cat: 'photo', title: 'High-Density Flex Banners', 
        desc: 'Dynamic weather-resistant banners for massive scale presence.', 
        features: ['Star Flex Material', 'Reinforced Eyelets', 'Vibrant Solvent Ink', 'Fade Resistance'],
        specs: { material: 'PVC Black-back', weight: '280gsm - 440gsm', print: 'Solvent/UV', minOrder: '100 sqft' },
        variants: [
            { name: 'Standard Star Flex', price: '₹15/sqft' }, 
            { name: 'Premium Black-Back', price: '₹28/sqft' }
        ] 
    },
    { 
        id: 'standees', cat: 'photo', title: 'Roll-up Deluxe Standees', 
        desc: 'Portable enterprise displays for elite exhibitions.', 
        features: ['Solid Aluminum Base', 'B-curled Banner', 'Padded Case', 'One-Minute Assembly'],
        specs: { size: '3x6 / 2x5 ft', base: 'Aluminum Alloy', material: 'Non-tear PVC', minOrder: '1 Unit' },
        variants: [
            { name: 'Standard 3x6 ft', price: '₹1999' }, 
            { name: 'Premium Luxury (Heavy)', price: '₹2999' }
        ] 
    },
    { 
        id: 'vinyl-posters', cat: 'photo', title: 'Self-Adhesive Vinyl', 
        desc: 'High-resolution wall graphics with anti-bubble technology.', 
        features: ['Easy Application', 'Removable Vinyl', 'Satin Lamination', 'High DPI Output'],
        specs: { brand: '3M/Avery', finish: 'Matte/Gloss', durability: '3+ Years', minOrder: '50 sqft' },
        variants: [
            { name: 'Standard Gloss Vinyl', price: '₹45/sqft' }, 
            { name: 'Laminated Anti-Glare', price: '₹75/sqft' }
        ] 
    },
    { 
        id: 'acrylic-frames', cat: 'photo', title: 'Acrylic Sandwich Frames', 
        desc: 'Crystal-clear frameless mounting for luxury photography.', 
        features: ['Ultra-Clear Cast Acrylic', 'Machine Polished Edges', 'Silver Stud Stand-offs', 'Modern Floating Vibe'],
        specs: { thickness: '3mm + 3mm', studs: 'Stainless Steel', edges: 'Diamond Polished', minOrder: '1 Unit' },
        variants: [
            { name: '8x12 (Desktop)', price: '₹899' }, 
            { name: '24x36 (Gallery)', price: '₹4999' }
        ] 
    },
    { 
        id: 'polaroids', cat: 'photo', title: 'Vintage Polaroid Sets', 
        desc: 'Retro instant-style memory cards on premium cardstock.', 
        features: ['Retro Border Styling', 'Thick Glossy Finish', 'Storage Tin Included', 'Sets of 24/48'],
        specs: { size: '3.5x4.25 in', paper: 'Silk Gloss 300gsm', packaging: 'Eco Box', minOrder: '1 Set' },
        variants: [
            { name: 'Legacy Set (24)', price: '₹349' }, 
            { name: 'Elite Set (48)', price: '₹599' }
        ] 
    },
    // Corporate
    { 
        id: 'custom-mugs', cat: 'corporate', title: 'Logo Ceramic Mugs', 
        desc: 'Branded ceramic mugs with high-definition branding.', 
        features: ['Microwave Safe', 'High-Gloss Finish', 'Permanent Print', 'Standard Gift Boxing'],
        specs: { volume: '330ml', print: 'Sublimation', material: 'Premium A-grade', minOrder: '10 Units' },
        variants: [
            { name: 'Classic White', price: '₹149' }, 
            { name: 'Black Magic (Heat Reveal)', price: '₹399' }
        ] 
    },
    { 
        id: 'metal-pens', cat: 'corporate', title: 'Engraved Metal Pens', 
        desc: 'Luxury metal pens with intricate laser-carved branding.', 
        features: ['Brass/Steel Body', 'Laser Engraving', 'German Ink Refill', 'Tactile Weight'],
        specs: { refill: 'Blue/Black', weight: '22g', box: 'Velvet Sleeve', minOrder: '50 Units' },
        variants: [
            { name: 'Standard Metal-Grip', price: '₹299' }, 
            { name: 'Luxury Gold-Trim', price: '₹699' }
        ] 
    },
    { 
        id: 'id-cards', cat: 'corporate', title: 'PVC ID Solutions', 
        desc: 'Thermal-printed identification cards for entire workforces.', 
        features: ['Fargo HD Print', 'Tamper Proof', 'Color-matched Lanyards', 'Dual-sided Print'],
        specs: { material: 'PVC/Teslin', thickness: '760 Microns', chips: 'Optional RFID', minOrder: '10 Units' },
        variants: [
            { name: 'Standard PVC', price: '₹89' }, 
            { name: 'Smart RFID Card', price: '₹199' }
        ] 
    },
    { 
        id: 'leather-diaries', cat: 'corporate', title: 'Luxury Embossed Diaries', 
        desc: 'Bespoke leatherette planners for professional utility.', 
        features: ['Heat Debossing', '80gsm Cream Paper', 'Planner Layout', 'Elastic Closure'],
        specs: { binding: 'Hardbound', paper: '70-80gsm Cream', size: 'A5/B5', minOrder: '50 Units' },
        variants: [
            { name: 'A5 Hardcover', price: '₹499' }, 
            { name: 'B5 Desktop Executive', price: '₹899' }
        ] 
    },
    { 
        id: 'gift-boxes', cat: 'corporate', title: 'Magnetic Gift Boxes', 
        desc: 'Rigid magnetic luxury boxes for curated presentation.', 
        features: ['1200gsm Rigid Board', 'Strong Magnetic Seal', 'Custom Velvet Foam', 'Ribbon Lacing'],
        specs: { board: 'Cardboard 2.5mm', finish: 'Vivid Lamination', closure: 'Magnetic Hidden', minOrder: '100 Units' },
        variants: [
            { name: 'Small Cube Premium', price: '₹649' }, 
            { name: 'Large Corporate Hamper', price: '₹1599' }
        ] 
    },
    { 
        id: 'mousepads', cat: 'corporate', title: 'HD Printed Mousepads', 
        desc: 'Elite cloth-top mousepads for immersive desk branding.', 
        features: ['Non-slip Rubber Base', 'Speed-cloth Top', 'Stitched Edges', 'Full Scale Print'],
        specs: { thickness: '3mm', base: 'Nature Rubber', print: 'Heat Transfer', minOrder: '50 Units' },
        variants: [
            { name: 'Standard Desktop', price: '₹129' }, 
            { name: 'Extended Large (Gaming Style)', price: '₹549' }
        ] 
    },
    { 
        id: 'keychains', cat: 'corporate', title: 'Bespoke Keyrings', 
        desc: 'Branded metal and acrylic key chains for modern utility.', 
        features: ['Custom Shape Laser', 'Dual Sided Logo', 'Heavy-duty Metal', 'High Shine Coating'],
        specs: { material: 'Acrylic/SS/Brass', shape: 'Any Shape', chain: 'Rust-proof', minOrder: '100 Units' },
        variants: [
            { name: 'Acrylic Custom Shape', price: '₹45' }, 
            { name: 'Solid Metal Engraved', price: '₹149' }
        ] 
    },
    // Packaging
    { 
        id: 'shipping-boxes', cat: 'packaging', title: 'Corrugated Mailers', 
        desc: 'Eco-friendly mailers for secure and branded logistics.', 
        features: ['E-flute Durability', '100% Recyclable', 'Custom Dimensionality', 'Internal Print Option'],
        specs: { wall: '3-Ply / 5-Ply', print: 'Flexo/Digital', strength: '10kg Load', minOrder: '500 Units' },
        variants: [
            { name: 'Small E-Mailer (6x4)', price: '₹22/pc' }, 
            { name: 'Large Transit Box (12x12)', price: '₹55/pc' }
        ] 
    },
    { 
        id: 'paper-bags', cat: 'packaging', title: 'Luxury Retail Bags', 
        desc: 'High-end retail bags for premium customer unboxing.', 
        features: ['200gsm Gloss Paper', 'Luxury Cord Handles', 'Reinforced Base', 'Inner Side Printing'],
        specs: { paper: 'Kraft / Art Paper', handle: 'Twisted / Ribbon', weight: '2kg - 5kg Load', minOrder: '500 Units' },
        variants: [
            { name: 'Nature Kraft (Small)', price: '₹16/pc' }, 
            { name: 'Gloss Luxury (Large)', price: '₹49/pc' }
        ] 
    },
    { 
        id: 'pouches', cat: 'packaging', title: 'Standup Mylar Pouches', 
        desc: 'Boutique stand-up bags with resealable zippers.', 
        features: ['Foil Barrier Protection', 'Easy Tear Notches', 'Resealable Grip', 'Heat Sealable Top'],
        specs: { material: 'PET/BOPP/PE', finish: 'Matte/Frosted', barrier: 'High Oxygen Barrier', minOrder: '1000 Units' },
        variants: [
            { name: '100g Matte Window', price: '₹14/pc' }, 
            { name: '500g Full Foil', price: '₹26/pc' }
        ] 
    },
    { 
        id: 'mono-cartons', cat: 'packaging', title: 'Vibrant Retail Cartons', 
        desc: 'Full-color printed retail folding cartons for pharma and cosmetic use.', 
        features: ['300gsm Duplex Board', 'Aqueous Coating', 'Precision Die-Cut', 'Metallic Finish Spot'],
        specs: { weight: '230gsm - 400gsm', finish: 'UV / Drip / Satin', folding: 'Automatic Glue', minOrder: '2000 Units' },
        variants: [
            { name: 'Standard CMYK Gloss', price: '₹8/pc' }, 
            { name: 'Luxury Metallic Finish', price: '₹16/pc' }
        ] 
    },
    { 
        id: 'tissue-paper', cat: 'packaging', title: 'Branded Tissue Wrapping', 
        desc: 'Ultra-thin personalized wrapping paper for luxury goods.', 
        features: ['17gsm Prime Tissue', 'Acid-Free pH Safe', 'Pantone Color Match', 'Soft Texture'],
        specs: { weight: '17gsm - 22gsm', print: '1-2 Color Flexo', sheets: '50x70 cm', minOrder: '2000 Sheets' },
        variants: [
            { name: 'Standard Logo Print', price: '₹5/sheet' }, 
            { name: 'Gold/Silver Metallic Tint', price: '₹10/sheet' }
        ] 
    }
];

module.exports = { businessInfo, categories, products };
