export interface Offering {
  title: string;
  desc: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  ctaText: string;
  overview: {
    what: string;
    who: string;
    why: string;
  };
  offerings: Offering[];
  process: ProcessStep[];
  featuredProjectIds: string[]; // references project IDs in Projects.tsx (e.g. "08", "12", etc.)
  whyChooseUs: string[];
  faqs: FAQItem[];
  serviceAreas: string[];
  metaDescription: string;
}

export const servicesData: Record<string, ServiceData> = {
  "residential-architecture": {
    id: "residential-architecture",
    title: "Residential Architecture",
    tagline: "Creating timeless, bespoke spaces that combine functionality, innovation, and elegant design.",
    ctaText: "Book a Consultation",
    metaDescription: "Premium residential architecture services in Chennai, ECR, OMR, and Kumbakonam. Studio Tactile creates bespoke, minimalist, and luxury homes tailored to your lifestyle.",
    overview: {
      what: "Studio Tactile provides comprehensive residential architecture services, specializing in creating bespoke independent houses, luxury apartments, and sustainable family homes. Our design approach revolves around understanding the unique requirements of each family, translating their aspirations into physical forms that optimize space, natural light, and ventilation. We prioritize structural honesty, using high-quality raw materials and custom finishes to build homes that are both functional and visually striking.",
      who: "This service is specifically curated for homeowners, property owners, and families seeking to build their dream homes from the ground up, or renovate their existing properties into modern sanctuaries. It is for clients who value custom design over generic layouts and want a home that reflects their personal identity, habits, and long-term goals while maximizing the developmental value of their land parcel.",
      why: "Building a home is a lifetime investment that requires meticulous planning and spatial coordination. Hiring a professional architecture firm ensures that your space is optimized for thermal comfort, structural integrity, and local climatic conditions. Studio Tactile helps clients navigate municipal regulations, material selection, and site coordination, transforming complex building codes and engineering constraints into seamless, breathable living environments that stand the test of time."
    },
    offerings: [
      { title: "Concept Design & Spatial Planning", desc: "Developing initial space plans, flow analysis, and volumetric layouts that align with your lifestyle, site dynamics, and spatial requirements." },
      { title: "Vastu Shastra Alignment", desc: "Integrating traditional Indian spatial orientation principles with contemporary layout planning to ensure positive energy, air circulation, and natural light." },
      { title: "3D Visualization & Virtual Renders", desc: "Producing photorealistic high-fidelity renderings and walkthroughs to visualize the architecture, materials, and depth before construction begins." },
      { title: "Detailed Construction Drawings", desc: "Generating comprehensive architectural, structural, and working blueprints required by engineers and contractors on-site to execute details without error." },
      { title: "Material & Finish Curation", desc: "Hand-picking high-end materials, from exposed aggregate concrete and volcanic stone cladding to raw timber and custom metal trims, ensuring tactile consistency." },
      { title: "On-Site Supervision & Coordination", desc: "Conducting regular site inspections and engineering checks to ensure that the physical build aligns perfectly with approved design specifications." }
    ],
    process: [
      { step: "01", title: "Initial Consultation", desc: "We sit down with you to outline your lifestyle patterns, room requirements, design tastes, budget constraints, and long-term project objectives." },
      { step: "02", title: "Site Analysis & Survey", desc: "We conduct a thorough evaluation of your plot, assessing sun path, wind directions, soil conditions, surrounding structures, view blocks, and municipal setbacks." },
      { step: "03", title: "Schematic Concept Development", desc: "Our design lab drafts preliminary floor plans, spatial connections, and 3D volumetric ideas to test flow, proportions, and light insertion." },
      { step: "04", title: "Design Refinement & Approval", desc: "Based on your feedback, we refine the layouts, finalize material palettes, select colors, and present photorealistic renders for final client sign-off." },
      { step: "05", title: "Technical Drawing Package", desc: "We draft complete structural, electrical, plumbing, masonry, and carpentry drawing sheets, preparing the detailed execution package for contractors." },
      { step: "06", title: "Site Coordination & Handover", desc: "We work directly with execution teams on-site, resolving structural details, monitoring materials, and overseeing finishing details until handover." }
    ],
    featuredProjectIds: ["08", "13", "11", "06"],
    whyChooseUs: [
      "Bespoke, trend-defying design layouts tailored to individual family habits rather than mass-market patterns.",
      "Climate-responsive design practices that optimize natural cross-ventilation, daylighting, and thermal cooling.",
      "Rigorous documentation standard with 100+ structural drawings to avoid budget overruns and construction delays.",
      "A seamless integration of Vastu principles with contemporary, minimal, and brutalist design philosophies.",
      "Access to a curated, elite network of structural engineers, material suppliers, and specialized contractors."
    ],
    faqs: [
      {
        question: "How much does a custom architectural design project cost in Chennai?",
        answer: "The cost of architectural design services at Studio Tactile depends heavily on the project scope, built-up area, and complexity. Typically, professional architecture fees range from 5% to 8% of the total construction cost, or are calculated on a per-square-foot basis starting from ₹150 to ₹350 per sq. ft. for premium custom homes. This investment covers comprehensive site analysis, detailed spatial layouts, Vastu compliance, photorealistic 3D visualizations, and a complete structural execution drawing package (electrical, plumbing, masonry). By securing precise technical details prior to breaking ground, clients save up to 15% on construction costs by preventing expensive on-site alterations and material wastage."
      },
      {
        question: "How long does the design phase of a residential project take?",
        answer: "A standard custom residential design process takes between 3 to 6 months. This timeline includes the initial discovery session, site mapping, multiple iterative floor plan options, 3D elevation renders, and the compilation of detailed working drawings. The duration is directly influenced by the speed of feedback and revisions, the complexity of the site contours, and local municipal approval requirements. We prioritize thorough planning in this phase because a well-designed blueprint is the foundation of a smooth, error-free construction process, avoiding subsequent delays during execution."
      },
      {
        question: "Does Studio Tactile handle municipal building approvals?",
        answer: "Yes, Studio Tactile assists in compiling and preparing all necessary architectural documentation, setbacks, structural certifications, and drawing layouts required for government approvals (such as CMDA and DTCP in Tamil Nadu). While the physical submission and liaison with local municipal offices are often coordinated by a designated liaison agent or contractor, our design team ensures all layouts comply strictly with floor space index (FSI), height limits, fire safety, and setback regulations to ensure a smooth, worry-free approval process."
      }
    ],
    serviceAreas: ["Chennai", "OMR", "ECR", "Padur", "Chengalpattu", "Mahabalipuram", "Kumbakonam", "Tanjavur", "Bangalore"]
  },
  "luxury-villa-design": {
    id: "luxury-villa-design",
    title: "Luxury Villa Design",
    tagline: "Crafting exclusive private sanctuaries that redefine high-end tropical and modern coastal living.",
    ctaText: "Inquire Now",
    metaDescription: "Exclusive luxury villa architects in ECR, Chennai, and Pondicherry. Studio Tactile designs premium waterfront, weekend, and tropical villas with bespoke material curations.",
    overview: {
      what: "Our Luxury Villa Design service focuses on creating high-end, custom-built estates, beachfront properties, and serene countryside weekend homes. Studio Tactile works on a philosophy of 'silent luxury'—avoiding loud ornamentation in favor of natural stone textures, raw concrete volumes, expansive glass windows, and seamless indoor-outdoor flows. Every villa is designed as a private sanctuary, featuring cantilevered decks, private internal courtyards, reflective water bodies, and custom landscape integrations that frame natural views.",
      who: "This service is tailored for discerning private clients, business executives, and NRIs who want to construct an exclusive residential retreat. Our clients seek high privacy, spacious entertaining zones, personalized amenities (like swimming pools, home theaters, and double-height lounges), and premium specifications that elevate their living standard.",
      why: "A luxury villa is more than just a home; it is an architectural legacy and a personal sanctuary. Standard contractors lack the design vocabulary and material expertise required to execute complex structural spans, minimalist frameless windows, and custom concrete casting. Studio Tactile provides high-fidelity detailing and structural engineering support to handle complex geometries, bespoke lighting plans, and premium natural stones, ensuring your property is an architectural masterpiece."
    },
    offerings: [
      { title: "Bespoke Spatial Programming", desc: "Designing sprawling master suites, double-height galleries, open-plan gourmet kitchens, and dedicated entertainment wings." },
      { title: "Indoor-Outdoor Seamless Transition", desc: "Creating pocket gardens, skylit bathing zones, custom pergolas, and structural glass walls that merge the interior with nature." },
      { title: "Tactile Material Curations", desc: "Specifying imported travertine, basalt stones, seasoned teakwood, structural steel profiles, and hand-plastered micro-cement walls." },
      { title: "Custom Landscape Integration", desc: "Designing private water bodies, lap pools, minimalist hardscaping, and native flora layouts to blend the architecture with its setting." },
      { title: "Premium Automation & HVAC Planning", desc: "Coordinating integrated smart home systems, architectural lighting scenes, acoustic planning, and concealed multi-zone cooling." },
      { title: "Comprehensive Execution Audits", desc: "Providing regular aesthetic detailing checks on-site to inspect marble joints, concrete finishes, and custom cabinetry alignments." }
    ],
    process: [
      { step: "01", title: "Vision Alignment", desc: "An in-depth session exploring your lifestyle dreams, resort-style preferences, specific luxury amenities, and landscape desires." },
      { step: "02", title: "Topography & Microclimate Study", desc: "Mapping site levels, ocean breezes (for ECR/coastal sites), sun angles, soil salinity, and natural foliage to orient the villa." },
      { step: "03", title: "Volumetric Brutalist Concept", desc: "Drafting structural forms, cantilever models, double-height volumes, and courtyard configurations that anchor the villa on-site." },
      { step: "04", title: "Material & Render Presentation", desc: "Reviewing spatial walkthroughs alongside physical material samples—travertine, concrete blocks, and raw timbers—for sensory feedback." },
      { step: "05", title: "Structural & Finishes Package", desc: "Developing heavy structural drawings (cantilever calculations, steel framework details) and precise marble laying layouts." },
      { step: "06", title: "Premium Handover & Styling", desc: "Assisting during final finishing, landscaping completion, architectural lighting calibration, and handover of the luxury sanctuary." }
    ],
    featuredProjectIds: ["12", "07", "05", "10"],
    whyChooseUs: [
      "Expertise in 'Silent Monolith' and luxury brutalism design styles, emphasizing raw material beauty and scale.",
      "Proven track record designing large-span cantilevers, double-height voids, and complex concrete structures.",
      "Detailed lighting and acoustic design integrated from the earliest layout stage.",
      "Specialized experience handling coastal site factors (humidity, rust prevention, wind pressures along ECR).",
      "End-to-end material scouting, assisting clients in selecting high-end stones directly from global quarries."
    ],
    faqs: [
      {
        question: "What is the average cost of building a luxury villa in Chennai or ECR?",
        answer: "Constructing a premium, custom-designed luxury villa along ECR or in OMR, Chennai generally ranges from ₹5,500 to ₹10,000+ per sq. ft. for construction and high-end finishes. This cost variation depends on the structural complexity (such as large cantilevers, double-height glass panels, floating stairs), custom architectural elements (exposed board-formed concrete, volcanic basalt stone, premium hardwoods), and luxury amenities (infinity pools, smart home automation, high-end solar HVAC). Our design process helps plan these specifications in advance, ensuring accurate billing of quantities (BOQs) to prevent scope creep and keep the execution team on budget."
      },
      {
        question: "How does Studio Tactile handle salinity and weatherproofing in coastal ECR villa projects?",
        answer: "Coastal locations along ECR require specialized material specifications. We protect the building envelope by using marine-grade structural concrete with corrosion-resistant steel bars. Exterior claddings utilize non-porous stones (like basalt or granite) and highly durable charred wood (Shou Sugi Ban) rather than standard painted surfaces. We mandate marine-grade anodized aluminum frame windows (minimum 100 microns) and double-glazed glass with wind-pressure ratings. All steel hardware is specified in 316 stainless steel to prevent rust and maintain structural integrity against salt air."
      },
      {
        question: "Can you assist with landscape design and pool integration?",
        answer: "Yes, at Studio Tactile, we believe landscape design is an integral part of the architecture, not an afterthought. Our luxury villa service includes custom layout planning for swimming pools, outdoor pavilions, entry water features, and hardscaping (driveways, decks, pathways). We collaborate with specialist pool engineers for filtration systems and select native, salinity-tolerant flora that thrives in local soil while framing views and providing privacy."
      }
    ],
    serviceAreas: ["Chennai", "ECR", "OMR", "Padur", "Mahabalipuram", "Pondicherry", "Bangalore"]
  },
  "commercial-architecture": {
    id: "commercial-architecture",
    title: "Commercial Architecture",
    tagline: "Designing high-performance corporate offices, retail experiences, and public institutions.",
    ctaText: "Discuss Commercial Project",
    metaDescription: "Commercial architects in Chennai and Bangalore. Studio Tactile designs brand-aligned office buildings, boutique retail spaces, and creative workspaces.",
    overview: {
      what: "Our Commercial Architecture service specializes in creating brand-focused, efficient, and forward-thinking environments for business operations. We design corporate offices, commercial developments, premium retail flagships, and boutique showrooms. Studio Tactile approaches commercial spaces with a focus on brand alignment, spatial efficiency, user movement, and future adaptability. We aim to design structures that serve as physical representations of corporate identity while providing healthy, inspiring spaces that boost employee productivity and customer engagement.",
      who: "This service is designed for business developers, corporate brands, retail operators, and commercial investors looking to build office spaces, headquarters, boutique showrooms, or commercial complexes. We collaborate closely with project managers and corporate executives to deliver projects on-time and within commercial feasibility guidelines.",
      why: "Commercial spaces require a balance between form, code compliance, operational flows, and long-term durability. Studio Tactile ensures that buildings are optimized for high footfalls, comply with commercial fire escape norms, satisfy dynamic HVAC requirements, and achieve maximum floor area utility. We create design-led commercial spaces that attract top talent and leave a premium impression on clients."
    },
    offerings: [
      { title: "Workspace Strategy & Floor Optimization", desc: "Analyzing corporate operations to organize collaborative hubs, private offices, hot-desks, and breakout zones efficiently." },
      { title: "Facade & Building Envelope Design", desc: "Creating modern facades using structural glazing, glass fiber reinforced concrete (GFRC), or dynamic louvers for sun control." },
      { title: "Building Services Integration (MEP)", desc: "Coordinating HVAC ducts, high-speed data networks, fire sprinkler setups, and emergency pathways seamlessly into the design." },
      { title: "Acoustic & Interior Lighting Planning", desc: "Designing custom ceiling profiles, sound-absorbing surfaces, and human-centric circadian lighting schemes for maximum user comfort." },
      { title: "Sustainable Design (LEED Alignment)", desc: "Utilizing double glazing, solar facades, rainwater harvesting, and recycled materials to reduce building operational costs." },
      { title: "Brand Identity Integration", desc: "Translating your company's core values, colors, and philosophy into physical entrance portals, spatial volumes, and visitor zones." }
    ],
    process: [
      { step: "01", title: "Corporate Briefing", desc: "Understanding company headcounts, brand goals, growth projections, technological demands, and commercial budgets." },
      { step: "02", title: "Feasibility & FAR Audit", desc: "Evaluating road widths, local zoning bylaws, Floor Area Ratio (FAR) limits, parking requirements, and municipal commercial guidelines." },
      { step: "03", title: "Massing & Core Layouts", desc: "Drafting building footprints, locating lift cores, service shafts, fire exits, and organizing rentable area vs common zones." },
      { step: "04", title: "Detailed Exterior & Facade", desc: "Designing curtain walls, sunshades, structural envelopes, and selecting energy-efficient glass panels to optimize cooling loads." },
      { step: "05", title: "MEP Coordination", desc: "Working with specialized consultants to weave plumbing, high-voltage electrical panels, and central chiller lines without spatial conflict." },
      { step: "06", title: "Phased Execution Audit", desc: "Monitoring construction phases, reviewing factory mockup panels, and verifying finish details prior to final corporate occupancy." }
    ],
    featuredProjectIds: ["16", "05", "14"],
    whyChooseUs: [
      "Data-driven spatial planning that maximizes commercial efficiency and rentable floor areas.",
      "High-durability material specifications to lower lifetime maintenance and operating costs.",
      "Integration of energy-saving envelope designs that reduce air conditioning power bills by 20%.",
      "Coordination of complex MEP (Mechanical, Electrical, Plumbing) services in-house.",
      "Experience executing brand-aligned, iconic facade designs that command premium market value."
    ],
    faqs: [
      {
        question: "How does Studio Tactile optimize floor area efficiency in commercial buildings?",
        answer: "We maximize commercial efficiency by keeping the core layout (elevators, staircases, main utility ducts, restroom blocks) compact and structurally grouped. This opens up large open column-free spaces that offer tenant layout flexibility. We analyze Circulation-to-Rentable Area ratios, aiming for at least 85% usable workspace efficiency. Every layout conforms to regional commercial code heights, enabling flexible under-floor data cabling and over-ceiling HVAC integrations without making the spaces feel cramped."
      },
      {
        question: "Can you coordinate with corporate project management teams and MEP consultants?",
        answer: "Yes, our team is highly experienced in professional project management structures. We use cloud-coordinated BIM (Building Information Modeling) pipelines to collaborate with client-side project managers, quantity surveyors, and structural consultants. This helps detect clashes between HVAC, fire protection, and structural framing during the design phase, avoiding costly field changes and delays during the build."
      },
      {
        question: "What sustainable features do you integrate to reduce operational energy costs?",
        answer: "We design commercial building envelopes with passive cooling in mind. By orienting high glass exposures away from the direct east-west sun, introducing custom horizontal louvers (shading devices), and specifying double-glazed glass units (DGU) with low solar heat gain coefficients (SHGC), we lower the air conditioning cooling demand. We also incorporate LED sensor lighting layouts, greywater treatment loops, and solar rooftop structural plans, helping projects lower operational utility costs."
      }
    ],
    serviceAreas: ["Chennai", "OMR", "ECR", "Kumbakonam", "Tanjavur", "Bangalore"]
  },
  "interior-design": {
    id: "interior-design",
    title: "Interior Design",
    tagline: "Designing curated, responsive interiors defined by material clarity and custom details.",
    ctaText: "Book Interior Consultation",
    metaDescription: "Luxury interior designers in Chennai and Bangalore. Studio Tactile specializes in minimalist residential interiors, high-end retail, and premium workspaces.",
    overview: {
      what: "Our Interior Design service is dedicated to crafting highly detailed, functional, and sensory-rich interior volumes. Studio Tactile works on the principle that the interior of a space should feel like a natural extension of its architecture. We avoid standard laminates and ad-hoc decorative trims, choosing instead to focus on raw wood veneers, micro-cement floor finishes, custom metal details, and hand-applied plaster textures. We design custom built-in furniture, integrate subtle lighting scenes, and layout spaces to maximize usability, comfort, and visual flow.",
      who: "This service is curated for residential owners, premium retail spaces, design-focused corporate offices, and hospitality brands looking for high-quality interiors. Our typical client appreciates custom carpentry details, balanced color schemes, concealed utilities, and bespoke styling that makes a space feel open, clean, and warm.",
      why: "Executing high-end interiors requires deep material knowledge, detailed drawings, and close supervision. Standard interior vendors often use low-durability materials and generic layouts that break down quickly. Studio Tactile provides complete custom drawing packages—specifying joint details, hardware selections, lighting levels, and wood grains—ensuring that every custom wardrobe, kitchen cabinet, and lighting trim is executed to perfection."
    },
    offerings: [
      { title: "Custom Built-in Furniture & Joinery", desc: "Designing bespoke wardrobes, entertainment units, floating credenzas, and integrated desk systems using premium hardwoods." },
      { title: "Bespoke Lighting Design", desc: "Mapping recessed track lights, warm wall-washing fixtures, accent lights, and custom switches to create comfortable spaces." },
      { title: "Material & Color Consultation", desc: "Curating a balanced palette of micro-cement, oak veneer, raw linens, muted metal trims, and natural stones." },
      { title: "Kitchen & Wardrobe Detailing", desc: "Designing customized, ergonomic modular kitchens and dressers with high-quality soft-close runner systems." },
      { title: "Acoustic & Soft Furnishing curation", desc: "Selecting custom wall panels, linen drapery, textured carpets, and acoustic ceiling tiles for sound comfort." },
      { title: "Aesthetic Detailing & Styling", desc: "Curating art frames, selecting architectural hardware, and organizing furniture layout styling for a cohesive look." }
    ],
    process: [
      { step: "01", title: "Sensory Briefing", desc: "Discussing how you want the space to feel, how you interact with light, your storage needs, and preferred material textures." },
      { step: "02", title: "Spatial Flow Planning", desc: "Drafting detailed floor plans, tracking furniture layouts, checking circulation spaces, and finalizing functional zoning." },
      { step: "03", title: "Material Mood Boarding", desc: "Curating physical mockups of wood, stone, metal, and plaster finishes to align on textures and color palettes." },
      { step: "04", title: "3D Perspective Renderings", desc: "Visualizing the spaces with exact lighting setups, material selections, and furniture designs in 3D." },
      { step: "05", title: "Joinery & Electrical Drawings", desc: "Creating detailed joinery drawings (wood joints, glass partitions) and precise electrical plug point layouts." },
      { step: "06", title: "Styling & Final Handover", desc: "Overseeing custom carpentry installs, calibrating lighting fixtures, arranging custom decor, and presenting the final space." }
    ],
    featuredProjectIds: ["03", "04", "09", "15", "14"],
    whyChooseUs: [
      "Seamless integration of custom interiors with the building's core architectural volumes.",
      "Custom, handcrafted joinery detailing that avoids cheap mass-market laminates.",
      "Lighting designs planned from the start to enhance spatial depth and comfort.",
      "Strict control over utility layouts, concealing all electrical lines and plumbing panels.",
      "Strong partnerships with top custom metalworkers, stone masons, and wood artisans."
    ],
    faqs: [
      {
        question: "What is the cost of premium interior design services in Chennai?",
        answer: "Premium residential interior design projects in Chennai generally average from ₹2,000 to ₹4,500+ per sq. ft. of built-up area. This investment level includes custom-designed wood veneered furniture, modular kitchen systems with soft-close hardware, architectural track lighting, custom stone finishes (such as granite counters or marble wall accents), micro-cement flooring, and premium soft furnishings. Studio Tactile operates on a design fee model (usually calculated on total project value or built-up area), ensuring complete transparency in material sourcing without hidden markups."
      },
      {
        question: "Do you design modular kitchens and wardrobes in-house?",
        answer: "Yes. Every kitchen and wardrobe we build is custom-designed by our team to match the project's design language. We select the internal carcass structures, drawer runner systems (like Blum or Hettich), handleless profiles, and exterior finish panels (raw timber, matte lacquer, micro-cement). We draft exact kitchen work-triangle layouts, select custom countertop stones, and coordinate plumbing lines to match high-end appliance dimensions."
      },
      {
        question: "How long does a full home interior design and installation project take?",
        answer: "A standard interior project takes between 4 to 6 months from the initial design brief to final move-in. The design and 3D mockup phase takes 6 to 8 weeks, while the off-site wood factory production and on-site carpentry assembly, painting, stone fitting, and lighting installs take 3 to 4 months. We plan the schedule carefully to ensure carpentry installation starts as soon as on-site civil and masonry modifications are complete."
      }
    ],
    serviceAreas: ["Chennai", "OMR", "ECR", "Kumbakonam", "Tanjavur", "Bangalore"]
  },
  "landscape-design": {
    id: "landscape-design",
    title: "Landscape Design",
    tagline: "Integrating built form and nature through native flora, water features, and clean hardscaping.",
    ctaText: "Request Landscape Plan",
    metaDescription: "Landscape architects in Chennai and Pondicherry. Studio Tactile designs sustainable gardens, modern courtyards, and outdoor pools for premium homes.",
    overview: {
      what: "Our Landscape Design service is focused on creating dynamic outdoor spaces that complement the main architecture. We design private villa gardens, luxury pools, internal courtyards, entry decks, and rooftop gardens. Studio Tactile approaches landscapes with a focus on native plants, water efficiency, clean hardscaping, and ecological balance. We aim to design outdoor areas that feel like natural, living extensions of your home, framing views and creating serene outdoor rooms.",
      who: "This service is for property owners building villas or farmhouses who want to design their entire site, as well as hospitality developers building boutique resorts. We serve clients who value outdoor living, want to merge their indoor rooms with nature, and prefer clean, sustainable garden designs over high-maintenance lawns.",
      why: "A well-designed landscape increases property value and improves the home's thermal comfort. Unplanned landscaping often leads to high water consumption, drainage issues, and plants that wither in the local climate. Studio Tactile selects climate-appropriate plants, integrates efficient irrigation, designs durable drainage systems, and layouts hardscaping that handles local weather conditions."
    },
    offerings: [
      { title: "Courtyard & Garden Design", desc: "Creating private skylit courtyards, green partitions, and low-maintenance native plant layouts." },
      { title: "Pool & Outdoor Deck Design", desc: "Designing concrete swimming pools, overflow water features, and wooden lounge decks." },
      { title: "Hardscape Layout & Material selection", desc: "Designing pathways, stone entryways, seating decks, and choosing durable exterior stones." },
      { title: "Native Flora Selection & Soil Optimization", desc: "Selecting local, drought-resistant plants that grow well in local coastal or clay soils." },
      { title: "Irrigation & Drainage Planning", desc: "Designing automated drip irrigation networks, slope drainage, and rainwater recharge points." },
      { title: "Architectural Outdoor Lighting", desc: "Designing subtle outdoor lights to highlight trees, stone walls, and garden pathways safely at night." }
    ],
    process: [
      { step: "01", title: "Site Assessment", desc: "Analyzing soil quality, local wind directions, shading patterns from the main house, and water availability." },
      { step: "02", title: "Zoning & Circulation", desc: "Defining outdoor zones (dining deck, grass lawns, pool lounge, pathways) and establishing clear flow routes." },
      { step: "03", title: "Planting & Hardscape Drafts", desc: "Selecting structural trees, screening plants, lawn areas, and paving stone sizes." },
      { step: "04", title: "3D Landscape Visualizations", desc: "Creating renders to show the view from your windows and see how the outdoor lighting looks at night." },
      { step: "05", title: "Irrigation & Level Drawings", desc: "Drafting site slope lines, storm-water drains, sprinkler layouts, and pool structural sheets." },
      { step: "06", title: "Flora Planting Supervision", desc: "Supervising soil prep, plant placement, tree planting, and hardscape stone paving on-site." }
    ],
    featuredProjectIds: ["10", "12", "07"],
    whyChooseUs: [
      "Custom landscape designs that match the modern, minimalist style of the house.",
      "Focus on native, low-water plants that reduce garden maintenance costs by 40%.",
      "Proper water runoff and drainage designs to prevent local site flooding.",
      "Expertise in coastal landscape design along ECR and Pondicherry.",
      "Collaborations with quality nurseries to source mature, healthy trees."
    ],
    faqs: [
      {
        question: "Which plants are best suited for villa landscapes in ECR and Chennai?",
        answer: "ECR and coastal Chennai have sandy, salty soil and hot weather. We avoid high-water lawns, using native, drought-resistant plants instead. Structural trees like Plumeria (Temple Tree), Tabebuia, and Ficus varieties do very well. For screening and borders, we select salt-tolerant plants like Bougainvillea, Pandanus, Nerium Oleander, and ornamental grasses. These thrive in local conditions, require minimal watering once established, and handle the hot summer climate."
      },
      {
        question: "How do you handle storm-water drainage and rainwater harvesting?",
        answer: "We design the site slope to channel rainwater away from the house towards designated recharge pits and landscaped soakaways. This prevents flooding during heavy monsoon rains while recharging the local groundwater table. We use porous paving materials for driveways and walkways, allowing rainwater to soak directly into the ground rather than running off into public roads."
      },
      {
        question: "Do you design outdoor lighting for the garden?",
        answer: "Yes. Outdoor lighting is key for safety and aesthetics at night. We design custom low-voltage lighting plans, using warm-colored uplights on trees, recessed wall lights for paths, and underwater pool lights. All fixtures are rated IP67/68 water-resistant and made from non-corrosive materials (brass or polycarbonate) to prevent rust."
      }
    ],
    serviceAreas: ["Chennai", "ECR", "OMR", "Padur", "Mahabalipuram", "Pondicherry", "Kumbakonam", "Tanjavur"]
  },
  "renovation-remodeling": {
    id: "renovation-remodeling",
    title: "Renovation & Remodeling",
    tagline: "Reworking existing structures with purpose, structural honesty, and modern aesthetics.",
    ctaText: "Consult on Renovation",
    metaDescription: "Home renovation and remodeling services in Chennai. Studio Tactile transforms old structures into modern, functional, and light-filled spaces.",
    overview: {
      what: "Our Renovation & Remodeling service is dedicated to breathing new life into old, dark, or dysfunctional buildings. Studio Tactile works to find the hidden potential in older structures. We open up layout plans, remove unnecessary walls, add skylights to bring in natural light, and update outdated MEP services. We mix modern elements with the building's original character, using durable finishes to create clean, contemporary, and functional spaces.",
      who: "This service is for homeowners with older properties that need structural upgrades, buyers of old buildings who want to convert them, and commercial developers seeking to renovate older spaces. We help clients who want to improve spatial flow, add rooms, and upgrade their building's overall quality.",
      why: "Renovating older structures is challenging. Older buildings often have hidden structural weaknesses, outdated plumbing, or poor spatial flow. Unprofessional renovations can cause structural damage or lead to high costs. Studio Tactile conducts thorough site audits, works with structural engineers, and designs remodeling plans that improve spatial flow while maintaining building safety.",
    },
    offerings: [
      { title: "Structural Integrity Assessment", desc: "Auditing columns, slabs, and walls to ensure they can handle remodeling and expansions." },
      { title: "Spatial Reorganization & Open Plans", desc: "Removing non-load-bearing walls to connect rooms, improve flow, and increase natural light." },
      { title: "Skylight & Ventilation Insertion", desc: "Adding light wells, custom skylights, and larger window openings to brighten dark interiors." },
      { title: "MEP System Upgrades", desc: "Replacing old wiring, replacing rusty pipes, and installing energy-efficient air conditioning routes." },
      { title: "Aesthetic Facade Transformation", desc: "Updating the building exterior with new cladding, modern windows, and clean geometric lines." },
      { title: "Damp-Proofing & Restorations", desc: "Identifying water leaks, applying modern waterproofing layers, and repairing cracked masonry." }
    ],
    process: [
      { step: "01", title: "On-site Audit", desc: "Evaluating structural safety, measuring the existing layout, and checking for water leaks or cracks." },
      { step: "02", title: "Remodeling Conceptualization", desc: "Designing new floor plans, mapping wall removals, and proposing ways to bring in natural light." },
      { step: "03", title: "Structural Engineering Review", desc: "Working with structural engineers to design beam supports (like steel beams) for removed walls." },
      { step: "04", title: "Finish & Material selection", desc: "Selecting claddings, flooring stones, and paint colors to update the old structure." },
      { step: "05", title: "Phased Execution Plan", desc: "Drafting a detailed demolition and build schedule to complete structural work safely." },
      { step: "06", title: "Remodeled Handover", desc: "Overseeing final painting, lighting installation, cabinetry work, and handing over the transformed space." }
    ],
    featuredProjectIds: ["09", "13", "08"],
    whyChooseUs: [
      "Specialized experience handling structural alterations and wall removals safely.",
      "Expertise in bringing natural light and air into older, dark layouts.",
      "Detailed site audits to identify water leaks and structural issues early.",
      "Clean integration of new modern elements with the building's historic character.",
      "Clear execution schedules to minimize disruption to nearby properties."
    ],
    faqs: [
      {
        question: "How do you know if a wall can be removed safely in a renovation?",
        answer: "Before removing any wall, we conduct a structural audit of the property. We locate the structural columns and load-bearing concrete walls. Non-load-bearing brick walls can be removed easily to open up layouts. If a load-bearing wall needs to be opened, we work with structural engineers to design steel beam supports (I-beams) or concrete lintels to redistribute the weight safely. This ensures the building remains stable and safe."
      },
      {
        question: "How do you address water dampness and wall peeling in older Chennai buildings?",
        answer: "Wall peeling and dampness are common in older buildings due to poor base waterproofing. We fix this by identifying the source of the leak, scraping off damaged plaster, and applying pressure-injected waterproofing chemicals. For external walls, we apply high-durability elastomeric waterproofing membranes before repainting. This prevents groundwater or rainwater from soaking into the bricks, keeping the interiors dry."
      },
      {
        question: "Is it cheaper to renovate or build new?",
        answer: "Renovation is generally more cost-effective if the building's foundation and columns are in good condition. A deep remodel can save up to 40% compared to demolition and rebuilding, while avoiding the need for new approval registrations. However, if the old concrete has corroded badly or the layout is extremely limited, rebuilding may be the better option. We help clients weigh these choices during our initial site audit."
      }
    ],
    serviceAreas: ["Chennai", "OMR", "ECR", "Kumbakonam", "Tanjavur", "Trichy", "Bangalore"]
  },
  "turnkey-construction": {
    id: "turnkey-construction",
    title: "Turnkey Construction",
    tagline: "Delivering projects from initial concept planning to final handover, on time and on budget.",
    ctaText: "Discuss Turnkey Project",
    metaDescription: "Turnkey construction services in Chennai and Kumbakonam. Studio Tactile manages design, approvals, materials, and construction for premium homes.",
    overview: {
      what: "Our Turnkey Construction service offers complete project management from start to finish. Studio Tactile handles the entire process: design, approvals, materials, construction, and final finishing. We manage the project so you don't have to coordinate with multiple vendors, contractors, and engineers. We use clear scheduling, cost estimates, and on-site monitoring to deliver high-quality custom homes and commercial buildings on-time and on-budget.",
      who: "This service is for busy professionals, property owners, and NRIs who want to build a premium home or commercial building without the stress of managing daily construction details. It is for clients who value quality construction, transparent billing, and a single point of responsibility.",
      why: "Building a project involves managing many moving parts: designers, structural engineers, mason teams, plumber teams, material suppliers, and government approvals. Coordinating these vendors can lead to design errors, material delays, and cost overruns. Studio Tactile handles all these teams under one contract, ensuring that design details are executed correctly on-site without delays or extra costs."
    },
    offerings: [
      { title: "Unified Design & Build Team", desc: "Combining architectural designers and construction teams to build the project exactly as drawn." },
      { title: "Fixed Budgets & Transparent Material Lists", desc: "Providing detailed material lists and fixed cost estimates early to prevent budget surprises." },
      { title: "Project Schedule Management", desc: "Using detailed construction schedules to track progress and deliver the project on time." },
      { title: "Quality Material Sourcing", desc: "Sourcing certified steel, high-grade concrete, and premium finishing materials directly from suppliers." },
      { title: "Government Approval Support", desc: "Compiling all documents and drawing plans required for municipal building approvals." },
      { title: "Regular Progress Reporting", desc: "Sending weekly photos, video updates, and project status reports to keep you informed." }
    ],
    process: [
      { step: "01", title: "Vision & Budgeting", desc: "Designing initial layouts and compiling detailed cost estimates to match your budget." },
      { step: "02", title: "BIM & Detail Design", desc: "Creating full 3D digital models to plan structural, electrical, and plumbing routes before building." },
      { step: "03", title: "Approvals & Site Prep", desc: "Securing municipal approvals, leveling the site, setting up site offices, and preparing foundations." },
      { step: "04", title: "Civil & Structural Build", desc: "Casting concrete columns, laying brick walls, and building the structural shell." },
      { step: "05", title: "Finishing & Services Install", desc: "Installing window frames, plastering walls, tiling floors, and running plumbing/electrical cables." },
      { step: "06", title: "Inspections & Handover", desc: "Testing all systems (electrical, plumbing, HVAC), final cleaning, and handing over the keys to your new space." }
    ],
    featuredProjectIds: ["13", "08", "04"],
    whyChooseUs: [
      "Single point of responsibility for both design and construction phases.",
      "Clear, fixed-price contracts with detailed specifications to prevent cost overruns.",
      "Strict quality control checks at every stage of construction.",
      "Weekly photo and video progress reports for remote owners.",
      "Access to quality custom fabricators and material suppliers."
    ],
    faqs: [
      {
        question: "What are the benefits of a design-build turnkey contract over separate hiring?",
        answer: "A turnkey contract combines the architect and builder into one team. This avoids conflicts where the builder blames the designer for layout errors, or the designer claims the builder used the wrong materials. This setup saves time and prevents extra costs. It also ensures that custom details (like exposed concrete, hidden details, and custom window frames) are executed correctly because the building team works directly with the designers."
      },
      {
        question: "How does Studio Tactile handle price updates for building materials during construction?",
        answer: "We offer fixed-price contracts based on a detailed bill of quantities (BOQ) agreed upon before signing. We buy core materials (like steel, cement, and bricks) in bulk early in the project to secure prices. If material costs change, we absorb the difference within the contract guidelines. If you choose to upgrade fixtures or materials during the project, we provide clear cost updates before making changes."
      },
      {
        question: "How do you keep clients updated on progress, especially remote owners or NRIs?",
        answer: "We use project management tools to track schedules and tasks. We send weekly progress reports with photos and video updates showing the work completed. We also arrange regular video calls to review details on-site. This keeps you informed of your project's progress, even if you are out of the country."
      }
    ],
    serviceAreas: ["Chennai", "OMR", "ECR", "Kumbakonam", "Tanjavur", "Bangalore"]
  }
};
