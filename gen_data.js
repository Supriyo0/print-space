const fs = require('fs');

const BASE = 'https://kaagazprints.com/image/home-page-image/';

// Fully curated product list sourced from kaagazprints.com
const products = [
  // ── STATIONERY ──────────────────────────────────────────────────────────
  { id:'visiting-card', cat:'stationery', title:'Visiting Cards', bentoSize:'bento-large',
    desc:'350gsm ultra-premium visiting cards with velvet matte lamination — the definitive mark of professional identity.',
    image: BASE+'visiting-card.jpg',
    variants:[{name:'Standard Matte',price:'₹0.38'},{name:'Spot UV',price:'₹1.20'}],
    features:['350gsm Art Card','Velvet Matte','Double Sided'],
    specs:{'Material':'Art Card','Finish':'Matte / UV','Cutting':'Square / Rounded'} },

  { id:'business-card-premium', cat:'stationery', title:'Deluxe Business Cards', bentoSize:'bento-standard',
    desc:'Foil-stamped butterfly-finish cards that command instant authority at every handshake.',
    image: BASE+'Business-Cards-With-Butterflies.webp',
    variants:[{name:'Butterfly Finish',price:'₹2.50'},{name:'Gold Foil',price:'₹4.50'}],
    features:['400gsm Board','Gold Foil','Butterfly Emboss'],
    specs:{'Material':'Textured Card','Effect':'Foil Stamp','GSM':'400'} },

  { id:'letterheads', cat:'stationery', title:'Executive Letterheads', bentoSize:'bento-wide',
    desc:'Watermark-ready 100gsm bond paper for official correspondence that conveys gravitas.',
    image: BASE+'Letter-Heads.webp',
    variants:[{name:'100gsm Bond',price:'₹1.80'},{name:'120gsm Royale',price:'₹2.90'}],
    features:['Laser Safe','Watermark Ready','Crisp Print'],
    specs:{'Size':'A4','Material':'Bond Paper','Finish':'Uncoated'} },

  { id:'personalized-notebooks', cat:'stationery', title:'Hardbound Journals', bentoSize:'bento-standard',
    desc:'A5 leatherette-bound journals with ivory pages and gold-foil corporate logo stamping.',
    image: BASE+'Personalised_Notebooks.webp',
    variants:[{name:'A5 Leatherette',price:'₹160'},{name:'Premium Wiro',price:'₹220'}],
    features:['Leatherette Cover','Ivory Paper','Custom Logo'],
    specs:{'Size':'A5','Pages':'192','Binding':'Hardbound'} },

  { id:'notepads', cat:'stationery', title:'Corporate Notepads', bentoSize:'bento-standard',
    desc:'50-leaf custom notepads with branded header — essential desk architecture for every professional.',
    image: BASE+'Notepads.webp',
    variants:[{name:'A4 50 Leaf',price:'₹45'},{name:'A5 100 Leaf',price:'₹65'}],
    features:['Glued Binding','Custom Header','100gsm Sheets'],
    specs:{'Size':'A4 / A5','Leaves':'50-100','Print':'One / Two Color'} },

  { id:'id-cards', cat:'stationery', title:'Smart PVC ID Cards', bentoSize:'bento-standard',
    desc:'CR80 PVC credentials with precision thermal printing — available NFC-enabled for smart campuses.',
    image: BASE+'ID-Cards.webp',
    variants:[{name:'Standard PVC',price:'₹35'},{name:'NFC Smart',price:'₹85'}],
    features:['Gloss/Matte Finish','Rounded Corners','Barcode Ready'],
    specs:{'Size':'CR80 (54×86mm)','Material':'760µ PVC','Print':'Thermal/Inkjet'} },

  { id:'presentation-folders', cat:'stationery', title:'Presentation Folders', bentoSize:'bento-wide',
    desc:'Die-cut executive folders with card slit — the definitive vessel for high-stakes business pitches.',
    image:'https://images.unsplash.com/photo-1629858348483-29ec3fed988a?w=800&q=80',
    variants:[{name:'Matte 300gsm',price:'₹18'},{name:'Spot UV',price:'₹28'}],
    features:['Card Pocket','300gsm Board','Full Bleed'],
    specs:{'Size':'9.5×12"','Material':'Art Board','Finish':'Matte/Spot UV'} },

  { id:'table-calendar', cat:'stationery', title:'Executive Desk Calendars', bentoSize:'bento-standard',
    desc:'Tent-style A5 desk calendars — premium brand touchpoints on every executive\'s table, year-round.',
    image: BASE+'table-calendar.webp',
    variants:[{name:'A5 Tent',price:'₹95'},{name:'A4 Hard Stand',price:'₹145'}],
    features:['Kappa Board Stand','Textured Leaves','Foil Dates'],
    specs:{'Size':'A5/A4','Leaves':'12-14','Base':'2mm Kappa'} },

  { id:'invoice-books', cat:'stationery', title:'Invoice & Receipt Books', bentoSize:'bento-standard',
    desc:'Duplicate / triplicate NCR invoice books with custom serial numbering for impeccable audit trails.',
    image: BASE+'Invoice-Books.webp',
    variants:[{name:'Duplicate NCR',price:'₹220'},{name:'Triplicate NCR',price:'₹320'}],
    features:['NCR Paper','Serial Numbered','Wax Coated'],
    specs:{'Sets':'50 per book','Size':'A4 / A5','Copies':'2 / 3'} },

  { id:'certificates', cat:'stationery', title:'Custom Certificates', bentoSize:'bento-standard',
    desc:'Gold-bordered achievement certificates printed on 170gsm textured ivory for lasting recognition.',
    image: BASE+'Custom-Certificates.webp',
    variants:[{name:'Standard Print',price:'₹15'},{name:'Gold Border Foil',price:'₹45'}],
    features:['Gold/Silver Border','Textured Paper','Custom Design'],
    specs:{'Size':'A4 Landscape','Weight':'170gsm','Finish':'Gloss/Matte'} },

  // ── STICKERS & LABELS ───────────────────────────────────────────────────
  { id:'vinyl-stickers', cat:'stickers', title:'Industrial Vinyl Stickers', bentoSize:'bento-large',
    desc:'UV-resistant, waterproof die-cut vinyl stickers built to outlast weather, chemicals and time.',
    image: BASE+'sticker.webp',
    variants:[{name:'Custom Die-Cut',price:'₹3.50'},{name:'Transparent',price:'₹4.20'}],
    features:['Waterproof','UV Resistant','3+ Year Life'],
    specs:{'Adhesive':'High-Tack','Durability':'3+ Years','Finish':'Gloss/Matte'} },

  { id:'security-stickers', cat:'stickers', title:'Tamper-Evident Security Seals', bentoSize:'bento-standard',
    desc:'Void-pattern egg-shell stickers that permanently reveal tampering — essential for warranty protection.',
    image: BASE+'Security_sticker.webp',
    variants:[{name:'Standard Void',price:'₹2.80'},{name:'Holographic',price:'₹4.50'}],
    features:['Void On Removal','Egg-Shell Destructible','Serial Numbered'],
    specs:{'Material':'PET/Void','Security Level':'4','Use':'Hardware/Pharma'} },

  { id:'permanent-stickers', cat:'stickers', title:'Permanent Bond Stickers', bentoSize:'bento-standard',
    desc:'Industrial permanent adhesive labels built for high-temperature and chemical-resistant environments.',
    image: BASE+'Permanent-Sticker.webp',
    variants:[{name:'White Gloss',price:'₹2.00'},{name:'Silver Metalized',price:'₹3.20'}],
    features:['Permanent Adhesive','Heat Resistant','Waterproof'],
    specs:{'Adhesive':'Super Tack','Temp Range':'−20°C to 150°C','Finish':'Gloss/Silver'} },

  { id:'dome-stickers', cat:'stickers', title:'3D Dome Epoxy Stickers', bentoSize:'bento-standard',
    desc:'Resin-coated dome stickers with a premium 3D bubble effect — unforgettable brand tactility.',
    image: BASE+'Custom-Dome-Sticker.webp',
    variants:[{name:'Standard Dome',price:'₹8'},{name:'Premium Dome',price:'₹12'}],
    features:['3D Resin Dome','UV-Gloss Coat','Waterproof Base'],
    specs:{'Material':'Epoxy Resin','Effect':'Raised 3D','Use':'Branding/Gifts'} },

  { id:'sartin-labels', cat:'stickers', title:'Satin Fabric Labels', bentoSize:'bento-standard',
    desc:'Silky satin woven labels for premium garments — the hallmark of luxury clothing branding.',
    image: BASE+'Sartin-Labels.webp',
    variants:[{name:'Woven Satin',price:'₹5'},{name:'Iron-On',price:'₹7'}],
    features:['Silky Texture','Printed/Woven','Wash Proof'],
    specs:{'Material':'Satin','Application':'Garment','Width':'25-38mm'} },

  { id:'address-labels', cat:'stickers', title:'Custom Address Labels', bentoSize:'bento-standard',
    desc:'Bulk personalized shipping and address labels with variable data printing for e-commerce logistics.',
    image: BASE+'Custom-Address-Labels.webp',
    variants:[{name:'A4 Sheet (24 per)',price:'₹12'},{name:'Roll Labels',price:'₹0.50 each'}],
    features:['Variable Data','Peel & Stick','Laser/Inkjet Safe'],
    specs:{'Size':'63.5×33.9mm std','Sheet':'A4/Roll','Adhesive':'Removable/Perm'} },

  // ── APPAREL ─────────────────────────────────────────────────────────────
  { id:'polo-tshirts', cat:'apparel', title:'Executive Polo T-Shirts', bentoSize:'bento-large',
    desc:'220gsm honeycomb matty polo shirts with precision corporate embroidery — the uniform of excellence.',
    image: BASE+'Polo_T-Shirts.webp',
    variants:[{name:'220gsm Matty',price:'₹320'},{name:'Dry-Fit',price:'₹390'}],
    features:['Embroidery Ready','Anti-Shrink','Honeycomb Knit'],
    specs:{'Fabric':'Matty Cotton','GSM':'220','Technique':'Embroidery/DTF'} },

  { id:'round-neck-tshirt', cat:'apparel', title:'Round Neck Cotton T-Shirts', bentoSize:'bento-standard',
    desc:'100% bio-washed pure cotton with DTF digital printing — vibrant, long-lasting team branding.',
    image: BASE+'Round_Neck_Cotton_T-Shirts.webp',
    variants:[{name:'180gsm',price:'₹180'},{name:'240gsm Heavy',price:'₹280'}],
    features:['Bio-Washed','DTF Print','Double-Needle Stitch'],
    specs:{'Material':'100% Cotton','GSM':'180-240','Print':'DTF Digital'} },

  { id:'custom-hoodies', cat:'apparel', title:'Premium Corporate Hoodies', bentoSize:'bento-standard',
    desc:'Heavyweight 320gsm fleece with kangaroo pocket — sophisticated cold-season corporate identity.',
    image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    variants:[{name:'320gsm Fleece',price:'₹650'},{name:'Zipper Hoodie',price:'₹780'}],
    features:['Kangaroo Pocket','Embroidery Ready','Anti-Pilling'],
    specs:{'Fabric':'Cotton-Poly Blend','GSM':'320','Style':'Pullover/Zipper'} },

  { id:'sports-tshirts', cat:'apparel', title:'Sports Full-Print T-Shirts', bentoSize:'bento-standard',
    desc:'All-over sublimation printed sports jerseys for corporate tournaments and brand activations.',
    image: BASE+'Custom-Sports-Full-Printing-T-Shirts.webp',
    variants:[{name:'Full Sublimation',price:'₹350'},{name:'Dri-Fit Performance',price:'₹420'}],
    features:['All-Over Print','Moisture Wick','Quick Dry'],
    specs:{'Material':'Microfiber Polyester','Print':'Dye Sublimation','Fit':'Athletic'} },

  { id:'caps', cat:'apparel', title:'Custom Printed Caps', bentoSize:'bento-standard',
    desc:'6-panel structured caps with embroidered logos — the perfect brand extension for field teams.',
    image: BASE+'Caps.webp',
    variants:[{name:'Structured 6-panel',price:'₹220'},{name:'Trucker Mesh',price:'₹260'}],
    features:['Embroidery/Print','Adjustable Back','UV Protection'],
    specs:{'Style':'6-Panel/Trucker','Logo':'Embroidery/Print','Closure':'Velcro/Snap'} },

  { id:'tote-bag', cat:'apparel', title:'Custom Tote Bags', bentoSize:'bento-standard',
    desc:'Eco-friendly canvas tote bags with full-colour screen printing — sustainable brand ambassadors.',
    image: BASE+'Tote-bag.webp',
    variants:[{name:'Canvas Natural',price:'₹95'},{name:'Coloured Canvas',price:'₹120'}],
    features:['Eco Canvas','Screen/DTF Print','Dual Handle'],
    specs:{'Material':'Canvas Cotton','Handle':'12" Cotton','Capacity':'~10L'} },

  // ── PACKAGING ────────────────────────────────────────────────────────────
  { id:'product-boxes', cat:'packaging', title:'Luxury Product Boxes', bentoSize:'bento-large',
    desc:'Stiff-board top-bottom boxes with UV matte coating and foil stamping for premium retail packaging.',
    image: BASE+'Boxes.jpg',
    variants:[{name:'Matte UV Box',price:'₹12'},{name:'Rigid Gift Box',price:'₹45'}],
    features:['Foil Stamping','UV Matte Coat','Custom Inserts'],
    specs:{'Structure':'Top-Bottom','Material':'3-ply Kraft/Rigid','Finish':'Matte UV'} },

  { id:'paper-bags', cat:'packaging', title:'Artisan Paper Bags', bentoSize:'bento-standard',
    desc:'Kraft and coated paper carry bags with reinforced rope handles — luxury unboxing for every brand.',
    image:'https://images.unsplash.com/photo-1582298759535-c49ea073df0d?w=800&q=80',
    variants:[{name:'Kraft Brown',price:'₹15'},{name:'Laminated White',price:'₹24'}],
    features:['Rope Handle','Reinforced Base','Eco Kraft/Art'],
    specs:{'Material':'150gsm Kraft/Art','Handle':'Cotton Rope','Load':'Up to 5kg'} },

  { id:'atm-pouches', cat:'packaging', title:'Customized ATM Pouches', bentoSize:'bento-standard',
    desc:'Branded ATM card envelopes for banks and fintechs — a sleek, security-grade delivery vessel.',
    image: BASE+'Customized-ATM-Pouches.webp',
    variants:[{name:'Standard Envelope',price:'₹4'},{name:'Holographic Seal',price:'₹7'}],
    features:['Security Seal','ATM-Card Fit','Custom Print'],
    specs:{'Size':'Standard ATM','Security':'Tamper Seal','Print':'CMYK Offset'} },

  // ── MARKETING ────────────────────────────────────────────────────────────
  { id:'standee', cat:'marketing', title:'Executive Roll-Up Standee', bentoSize:'bento-large',
    desc:'3×6 ft aluminum roll-up standees with 720dpi star-flex print — commanding presence at every event.',
    image: BASE+'standee.png',
    variants:[{name:'Aluminum Frame',price:'₹1200'},{name:'Chrome Base',price:'₹1800'}],
    features:['Star-Flex Print','Auto-Roll Frame','PVC Carry Bag'],
    specs:{'Size':'3ft × 6ft','Print':'720dpi Star','Frame':'Aluminum'} },

  { id:'tabletop-standee', cat:'marketing', title:'Tabletop Standees', bentoSize:'bento-standard',
    desc:'Compact A4/A5 folded desktop standees for point-of-sale Brand messaging.',
    image: BASE+'Tabletop_Standees.webp',
    variants:[{name:'A4 Folded',price:'₹18'},{name:'A5 Folded',price:'₹12'}],
    features:['Folded Display','350gsm Board','Self-Standing'],
    specs:{'Size':'A4 / A5','Material':'350gsm Art','Style':'Z-fold/L-fold'} },

  { id:'wall-calendar', cat:'marketing', title:'Artisan Wall Calendars', bentoSize:'bento-wide',
    desc:'12-leaf wire-bound art calendars — an entire year of premium brand engagement on office walls.',
    image:'https://images.unsplash.com/photo-1632766860471-182dca9ce466?w=800&q=80',
    variants:[{name:'6-Leaf',price:'₹120'},{name:'12-Leaf Pro',price:'₹190'}],
    features:['170gsm Art Paper','Metal Wiro Bind','Custom Artwork'],
    specs:{'Size':'12×18 / 15×20"','Leaves':'6 / 12','Mount':'Wall Hanger Strip'} },

  { id:'banner', cat:'marketing', title:'Flex & Fabric Banners', bentoSize:'bento-standard',
    desc:'High-tension fabric and flex banners with vivid eco-solvent inks — outdoor visible at 50 metres.',
    image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    variants:[{name:'Flex Banner',price:'₹18/sqft'},{name:'Fabric Backlit',price:'₹120/sqft'}],
    features:['UV Eco-Solvent Ink','Hem & Grommet','Weather Proof'],
    specs:{'Material':'Flex/Backlit Fabric','Inks':'UV Eco-Solvent','Resolution':'720-1440dpi'} },

  { id:'brochures', cat:'marketing', title:'Glossy Catalog Brochures', bentoSize:'bento-standard',
    desc:'Tri-fold and book-fold brochures on 170gsm gloss art — immersive brand storytelling in print.',
    image:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    variants:[{name:'Tri-Fold A4',price:'₹5'},{name:'Saddle Stitch Booklet',price:'₹22'}],
    features:['170gsm Gloss','Full CMYK','Multiple Folds'],
    specs:{'Material':'170gsm Art','Print':'4C+4C','Folds':'Tri/Z/Book'} },

  { id:'signs-posters', cat:'marketing', title:'Architectural Signs & Posters', bentoSize:'bento-standard',
    desc:'A0-to-A3 poster prints on anti-glare premium photo paper for corporate lobbies and retail stores.',
    image: BASE+'Signs_Posters.webp',
    variants:[{name:'A3 Gloss',price:'₹35'},{name:'A1 Canvas',price:'₹280'}],
    features:['Anti-Glare Paper','Vivid Pigment Ink','Multiple Sizes'],
    specs:{'Max Size':'A0','Material':'Photo/Canvas','Finish':'Gloss/Matte/Canvas'} },

  { id:'loyalty-cards', cat:'marketing', title:'Loyalty & Membership Cards', bentoSize:'bento-standard',
    desc:'Durable PVC loyalty cards with barcode or magnetic strip — engineered for robust rewards programs.',
    image: BASE+'Loyalty-Cards.webp',
    variants:[{name:'Standard PVC',price:'₹28'},{name:'Magnetic Strip',price:'₹55'}],
    features:['Barcode/QR','Magnetic Strip','Gloss Laminate'],
    specs:{'Size':'CR80','Material':'PVC 760µ','Options':'Barcode/Mag/RFID'} },

  { id:'scratch-cards', cat:'marketing', title:'Scratch Card Printing', bentoSize:'bento-standard',
    desc:'Silver-panel scratch cards with UV offset print — the ultimate promotional engagement mechanic.',
    image: BASE+'Scratch-Card.webp',
    variants:[{name:'Standard Scratch',price:'₹3.50'},{name:'Holographic Panel',price:'₹6'}],
    features:['Silver Scratch Panel','Unique Code Under','CMYK Print'],
    specs:{'Material':'300gsm Art','Panel':'Silver Scratch','Format':'Custom'} },

  { id:'button-badges', cat:'marketing', title:'Button Pin Badges', bentoSize:'bento-standard',
    desc:'58mm pin-back button badges — vibrant, magnetic conversation starters for events and activations.',
    image: BASE+'Button-Badges.webp',
    variants:[{name:'25mm Round',price:'₹8'},{name:'58mm Standard',price:'₹14'}],
    features:['Glossy Dome','Steel Pin Back','Vivid Print'],
    specs:{'Sizes':'25/38/58mm','Back':'Pin/Magnet','Finish':'Gloss Dome'} },

  { id:'fabric-flags', cat:'marketing', title:'Custom Fabric Flags', bentoSize:'bento-standard',
    desc:'Dye-sublimated outdoor fabric flags for corporate entrances, exhibitions and brand activations.',
    image: BASE+'Custom_Fabric_Flag.webp',
    variants:[{name:'Teardrop Flag',price:'₹1,800'},{name:'Feather Flag',price:'₹2,200'}],
    features:['Dye Sublimation','All-Weather','Pole Included'],
    specs:{'Material':'Polyester','Print':'Sublimation','Pole':'Fibreglass'} },

  // ── GIFTS ────────────────────────────────────────────────────────────────
  { id:'custom-mugs', cat:'gifts', title:'Ceramic Sublimation Mugs', bentoSize:'bento-standard',
    desc:'11oz & 15oz AAA ceramic mugs with full-wrap or patch-print sublimation — microwave and dishwasher safe.',
    image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
    variants:[{name:'White 325ml',price:'₹110'},{name:'Magic Reveal',price:'₹190'}],
    features:['Microwave Safe','Fade Resistant','Full/Patch Wrap'],
    specs:{'Capacity':'325ml / 450ml','Material':'Bone China','Print':'Sublimation'} },

  { id:'metal-pens', cat:'gifts', title:'Engraved Metal Pens', bentoSize:'bento-large',
    desc:'Weighted executive rollerball pens with laser-engraved brand identity — arriving gift-boxed.',
    image:'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80',
    variants:[{name:'Aluminum Body',price:'₹45'},{name:'Premium Rollerball',price:'₹180'}],
    features:['Laser Engraving','Gift Boxed','Smooth Ink'],
    specs:{'Body':'Aluminum/Steel','Ink':'Blue/Black','Engraving':'Contrast Laser'} },

  { id:'lanyards', cat:'gifts', title:'Sublimation Lanyards', bentoSize:'bento-standard',
    desc:'20-25mm full-colour satin lanyards — essential ID infrastructure for corporate events and campuses.',
    image:'https://images.unsplash.com/photo-1627918451877-bb891a329de4?w=800&q=80',
    variants:[{name:'20mm Satin',price:'₹22'},{name:'25mm Premium',price:'₹28'}],
    features:['Edge-to-Edge Print','Fish Hook / Dog Hook','Silky Satin'],
    specs:{'Width':'20-25mm','Material':'Satin','Print':'Sublimation'} },

  { id:'mousepads', cat:'gifts', title:'Custom Branded Mousepads', bentoSize:'bento-standard',
    desc:'Non-slip natural rubber base with stitched-edge sublimation surface — a daily brand impression.',
    image:'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
    variants:[{name:'Standard 3mm',price:'₹85'},{name:'XL Desk Mat',price:'₹350'}],
    features:['Stitched Edges','Anti-Slip Rubber','Edge-to-Edge Print'],
    specs:{'Base':'Natural Rubber','Top':'Polyester','Thickness':'3-5mm'} },

  { id:'water-bottles', cat:'gifts', title:'Branded Water Bottles', bentoSize:'bento-standard',
    desc:'900ml stainless-steel double-wall vacuum bottles with laser-engraved brand logo.',
    image: BASE+'Water-Bottles.webp',
    variants:[{name:'Stainless 750ml',price:'₹380'},{name:'Sipper Bottle',price:'₹220'}],
    features:['Vacuum Insulated','Laser Engraved','BPA-Free'],
    specs:{'Capacity':'750-900ml','Material':'SS304','Insulation':'Double Wall'} },

  { id:'coasters', cat:'gifts', title:'Custom Sublimation Coasters', bentoSize:'bento-standard',
    desc:'MDF and cork-back coasters with vivid sublimation print — premium corporate gifting at scale.',
    image: BASE+'Coasters.webp',
    variants:[{name:'MDF Round',price:'₹55'},{name:'Cork Back Set-4',price:'₹180'}],
    features:['Sublimation Print','Cork/MDF','Set Packaging'],
    specs:{'Diameter':'9.5cm','Material':'MDF/Cork','Print':'Sublimation'} },

  { id:'awards', cat:'gifts', title:'Acrylic & Crystal Awards', bentoSize:'bento-standard',
    desc:'3D-engraved acrylic and crystal trophies for corporate recognition with permanent laser etching.',
    image: BASE+'Awards.webp',
    variants:[{name:'Acrylic Standard',price:'₹350'},{name:'Crystal Premium',price:'₹1,200'}],
    features:['3D Laser Engraving','Custom Shape','Gift Packed'],
    specs:{'Material':'Acrylic/Crystal','Engraving':'3D Laser','Base':'Wooden or Metal'} },

  { id:'gift-hampers', cat:'gifts', title:'Corporate Gift Hampers', bentoSize:'bento-wide',
    desc:'Curated branded gift sets — mug, pen, notepad, and lanyard — packaged in a premium kraft box.',
    image: BASE+'Gift-Hampers.webp',
    variants:[{name:'Essential Set (4 items)',price:'₹850'},{name:'Executive Set (7 items)',price:'₹1,800'}],
    features:['Custom Branded','Kraft Gift Box','Mix & Match'],
    specs:{'Items':'4 to 7','Box':'Kraft Rigid','Print':'CMYK+Foil'} },

  { id:'pen-drive', cat:'gifts', title:'Custom USB Pen Drives', bentoSize:'bento-standard',
    desc:'Branded metal or wood-finish USB drives with laser-engraved logo — data gifting with elegance.',
    image: BASE+'Custom-Pen-Drive.webp',
    variants:[{name:'8GB Metal',price:'₹280'},{name:'16GB Premium',price:'₹380'}],
    features:['Laser Engraving','USB 2.0/3.0','Cap/Swivel Style'],
    specs:{'Capacity':'8-64GB','Interface':'USB 2.0/3.0','Casing':'Metal/Wood'} },

  { id:'laptop-skins', cat:'gifts', title:'Custom Laptop Skins', bentoSize:'bento-standard',
    desc:'Precision-cut 3M vinyl laptop skins with crystal-clear UV-flat printing — zero-bubble application.',
    image: BASE+'Laptop-Skins.webp',
    variants:[{name:'13" Skin',price:'₹180'},{name:'15.6" Skin',price:'₹240'}],
    features:['3M Vinyl','Bubble-Free','UV Print'],
    specs:{'Material':'3M Vinyl','Adhesive':'Removable','Print':'UV Flatbed'} },

  { id:'pin-name-badges', cat:'gifts', title:'Pin Name Badges', bentoSize:'bento-standard',
    desc:'Durable metal-frame name badges with pin and magnet back — smart, elegant event identification.',
    image: BASE+'Pin-Name-Badge.webp',
    variants:[{name:'Standard Metal Frame',price:'₹55'},{name:'Full-Colour PVC',price:'₹35'}],
    features:['Pin & Magnet Back','Custom Insert','Metal/PVC Frame'],
    specs:{'Frame':'Metal/Plastic','Back':'Pin or Magnet','Insert':'Printed Card'} },

  { id:'paper-embosser', cat:'gifts', title:'Custom Paper Embossers', bentoSize:'bento-standard',
    desc:'Mechanical dry embossers that leave a raised impression — the ultimate certified seal of authority.',
    image: BASE+'Paper-Embosser.webp',
    variants:[{name:'Standard Embosser',price:'₹1,200'},{name:'Deluxe Chrome',price:'₹1,800'}],
    features:['Custom Logo Die','Raised Impression','Mechanical Action'],
    specs:{'Die Shape':'Round/Oval','Diameter':'32-40mm','Reach':'40-50mm'} },

  // ── PHOTO & MEMORIES ─────────────────────────────────────────────────────
  { id:'hardbound-photo-book', cat:'photo', title:'Archival Hardbound Photo Books', bentoSize:'bento-large',
    desc:'The pinnacle of printed memory — lay-flat binding on 250gsm luster with a leatherette hardcover.',
    image:'https://images.unsplash.com/photo-1579782500045-8af5dc3e061e?w=800&q=80',
    variants:[{name:'A4 Lay-flat 20pg',price:'₹1,200'},{name:'12×12" Elite 40pg',price:'₹3,200'}],
    features:['Lay-Flat Bind','Leatherette Cover','Non-Tear Pages'],
    specs:{'Paper':'250gsm Luster','Binding':'Seamless Lay-flat','Cover':'Photographic/Leather'} },

  { id:'canvas-prints', cat:'photo', title:'Gallery Canvas Wraps', bentoSize:'bento-wide',
    desc:'12-color pigment archival inks on 300gsm cotton canvas, gallery-wrapped on a solid pine chassis.',
    image:'https://images.unsplash.com/photo-1544458319-75abcb3664d6?w=800&q=80',
    variants:[{name:'8×8" Square',price:'₹450'},{name:'20×30" Masterpiece',price:'₹1,900'}],
    features:['300gsm Cotton Canvas','Pine Wood Frame','UV Protected'],
    specs:{'Print':'12-Color Pigment','Wrap':'Gallery 1.5"','Finish':'Matte Polish'} },

  { id:'photo-albums', cat:'photo', title:'Lay-Flat Wedding Albums', bentoSize:'bento-standard',
    desc:'Flush-mount wedding albums with full-bleed full-colour pages — the heirloom for life\'s greatest moments.',
    image: BASE+'photo-albums.webp',
    variants:[{name:'12×12" 20 Spreads',price:'₹3,800'},{name:'10×10" 15 Spreads',price:'₹2,400'}],
    features:['Flush Mount','Full-Bleed Pages','Linen/Leather Cover'],
    specs:{'Pages':'30-60 pages','Paper':'Lustre/Gloss','Cover':'Linen/Leather'} },

  { id:'photo-frame', cat:'photo', title:'Custom Photo Frames', bentoSize:'bento-standard',
    desc:'Sublimation-printed MDF and acrylic photo frames — personalised gifts that speak without words.',
    image: BASE+'photo-frame.webp',
    variants:[{name:'4×6 MDF',price:'₹85'},{name:'5×7 Acrylic',price:'₹180'}],
    features:['Sublimation Print','Freestanding','Gift Packed'],
    specs:{'Sizes':'4×6 to 8×10"','Material':'MDF/Acrylic','Print':'Sublimation'} },

  // ── EVENTS & OCCASIONS ───────────────────────────────────────────────────
  { id:'wedding-cards', cat:'stationery', title:'Custom Wedding Cards', bentoSize:'bento-wide',
    desc:'Artisan wedding invitations on 350gsm textured imported stock with gold foil and laser cut detailing.',
    image: BASE+'Wedding-card.webp',
    variants:[{name:'Matte 350gsm',price:'₹18'},{name:'Gold Foil Laser',price:'₹55'}],
    features:['Imported Paper','Foil Stamping','Laser Cut Option'],
    specs:{'Size':'5×7" / Custom','Paper':'350gsm Textured','Finish':'Foil/Emboss'} },

  { id:'invitations', cat:'stationery', title:'Event Invitations', bentoSize:'bento-standard',
    desc:'Full-bleed 350gsm invitations for birthdays, corporate galas and celebrations — printed with ceremony.',
    image: BASE+'Birthday-Invitations.webp',
    variants:[{name:'A5 Single',price:'₹6'},{name:'A5 With Envelope',price:'₹12'}],
    features:['Full CMYK','Envelope Option','Custom Design'],
    specs:{'Size':'A5 / Custom','Material':'300-350gsm','Finish':'Gloss/Matte'} },

  { id:'tent-table-card', cat:'stationery', title:'Tent Table Cards', bentoSize:'bento-standard',
    desc:'Precision-scored and folded table name cards for hospitality and corporate dining — elegant and crisp.',
    image: BASE+'Tent-Table-Card.webp',
    variants:[{name:'Standard Tent',price:'₹3.50'},{name:'Luxury Board',price:'₹8'}],
    features:['Pre-Scored Fold','Custom Print','Multiple Sizes'],
    specs:{'Size':'A4 folded to A5','Material':'300gsm Art','Style':'Tent'} },

  { id:'envelopes', cat:'stationery', title:'Custom Printed Envelopes', bentoSize:'bento-standard',
    desc:'Branded DL and A4 envelopes with corporate letterhead printing — the first touchpoint in direct mail.',
    image: BASE+'Envelope.webp',
    variants:[{name:'DL Window',price:'₹2.50'},{name:'A4 Flat',price:'₹4'}],
    features:['Window/Non-Window','1&2 Color Print','Peel & Seal'],
    specs:{'Sizes':'DL/C5/A4','Material':'80-120gsm Bond','Print':'1-4 Color'} },

  { id:'shagun-envelope', cat:'gifts', title:'Premium Shagun Envelopes', bentoSize:'bento-standard',
    desc:'Opulent shagun/money envelopes with gold foil motifs — the traditional gift elevated to luxury.',
    image: BASE+'Custom-Shagun-Envelope.webp',
    variants:[{name:'Gold Print',price:'₹8'},{name:'Foil Embossed',price:'₹18'}],
    features:['Gold Motifs','Velvet Ribbon','Custom Name'],
    specs:{'Material':'Art Paper','Print':'Gold/Silver Foil','Size':'Standard Shagun'} },

  { id:'hotel-key-card', cat:'stationery', title:'Hotel Key Cards', bentoSize:'bento-standard',
    desc:'RFID and magnetic stripe hotel key cards with high-resolution branded artwork — premium hospitality.',
    image: BASE+'hotel-key-card.webp',
    variants:[{name:'RFID Card',price:'₹45'},{name:'Magnetic Stripe',price:'₹25'}],
    features:['RFID/Mag-Stripe','Gloss Laminate','Full CMYK'],
    specs:{'Material':'PVC 760µ','Tech':'RFID/Mag','Size':'CR80'} },

  { id:'wrist-band', cat:'marketing', title:'Security Wristbands', bentoSize:'bento-standard',
    desc:'Non-transferable Tyvek and silicone wristbands for events, festivals and hospital identification.',
    image: BASE+'Security-Wrist-Band.webp',
    variants:[{name:'Tyvek Paper',price:'₹3.50'},{name:'Silicone',price:'₹18'}],
    features:['Tamper-Evident','Waterproof','Custom Print'],
    specs:{'Material':'Tyvek/Silicone','Closure':'Permanent','Print':'CMYK'} },

  { id:'rubber-stamp', cat:'stationery', title:'Self-Ink Rubber Stamps', bentoSize:'bento-standard',
    desc:'Trodat and Colop self-inking rubber stamps with custom text/logo — permanent, crisp, professional.',
    image: BASE+'Custom_Self_Ink_Rubber_Stamp.webp',
    variants:[{name:'38×14mm Rect',price:'₹280'},{name:'Circular 40mm',price:'₹350'}],
    features:['Self-Inking','50,000+ Impressions','Custom Die'],
    specs:{'Brand':'Trodat/Colop','Ink':'Red/Blue/Black','Die':'Polymer'} },

  { id:'office-wallpaper', cat:'marketing', title:'Office Mural Wallpapers', bentoSize:'bento-wide',
    desc:'Custom-printed mural wallpapers for corporate interiors — brand identity at architectural scale.',
    image: BASE+'office-customise-wallpaper.webp',
    variants:[{name:'Vinyl Wallpaper',price:'₹85/sqft'},{name:'Fabric Mural',price:'₹120/sqft'}],
    features:['Peel & Stick','UV Ink','Removable/Permanent'],
    specs:{'Material':'Premium Vinyl','Adhesive':'Repositionable','Print':'UV Eco'} },

  { id:'door-hanger', cat:'marketing', title:'Door Hanger Sign Tags', bentoSize:'bento-standard',
    desc:'Custom die-cut door hangers for hotels, offices and retail — tactile branding that demands attention.',
    image: BASE+'Room-Privacy-Door-Hanger.webp',
    variants:[{name:'Standard Die-Cut',price:'₹4'},{name:'Spot UV Premium',price:'₹8'}],
    features:['Die-Cut','350gsm Art','Custom Design'],
    specs:{'Material':'350gsm Art','Finish':'Matte/Spot UV','Size':'4×9" Standard'} },
];

// Generate the data.js
const output = `const businessInfo = {
    name: "Print Space India",
    owner: "M. Rahman",
    tagline: "Industrial-Grade Print Engineering",
    heritage: "Since 2002",
    locations: [
        { city: "Kolkata (H.O)", address: "7/1A, Grant Lane, 1st Floor, Kolkata-700012", contact: "+91 98310 96069" },
        { city: "New Delhi (B.O)", address: "A-54, Naraina Industrial Area, Phase-I, New Delhi-110028", contact: "+91 79820 60969" }
    ],
    stats: {
        clients: "50k+",
        orders: "100k+",
        experience: "24+",
        projects: "1k+"
    }
};

const categories = [
    { id: "stationery", title: "Corporate Stationery", subtitle: "Architectural Office Ecosystems", icon: "ph-briefcase", color: "#b8960c", image: "https://kaagazprints.com/image/home-page-image/visiting-card.jpg" },
    { id: "stickers", title: "Labels & Stickers", subtitle: "Industrial Branding Precision", icon: "ph-sticker", color: "#b8960c", image: "https://kaagazprints.com/image/home-page-image/sticker.webp" },
    { id: "apparel", title: "Custom Apparel", subtitle: "High-Fidelity Corporate Wear", icon: "ph-t-shirt", color: "#b8960c", image: "https://kaagazprints.com/image/home-page-image/Round_Neck_Cotton_T-Shirts.webp" },
    { id: "packaging", title: "Luxury Packaging", subtitle: "Secure Transit Masterpieces", icon: "ph-package", color: "#b8960c", image: "https://kaagazprints.com/image/home-page-image/Boxes.jpg" },
    { id: "marketing", title: "Marketing & Events", subtitle: "Strategic Brand Visibility", icon: "ph-megaphone", color: "#b8960c", image: "https://kaagazprints.com/image/home-page-image/standee.png" },
    { id: "gifts", title: "Corporate Gifts", subtitle: "Bespoke Gratitude Artifacts", icon: "ph-gift", color: "#b8960c", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80" },
    { id: "photo", title: "Memories & Albums", subtitle: "Archival Grade Photo Engineering", icon: "ph-camera", color: "#b8960c", image: "https://images.unsplash.com/photo-1579782500045-8af5dc3e061e?w=800&q=80" }
];

const products = ${JSON.stringify(products, null, 4)};

module.exports = { businessInfo, categories, products };
`;

fs.writeFileSync('src/data.js', output);
console.log('✅ Generated src/data.js with', products.length, 'fully curated products.');
