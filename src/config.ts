// Business configuration — update these when a new renter signs on
export const config = {
  // Business info
  businessName: 'Parksville Handyman Services',
  phone: '(250) 555-0147',
  email: 'info@parksvillehandyman.ca',

  // Location info
  serviceAreas: ['Parksville', 'Qualicum Beach', 'Oceanside'],
  yearEstablished: 2024,

  // Site metadata
  siteTitle: 'Parksville Handyman | Local Handyman Services',
  siteDescription: 'Fast, reliable handyman services in Parksville & Qualicum Beach. Deck repair, drywall, gutters, fences & more. Free estimates.',

  // SEO
  localBusinessType: 'HomeAndConstructionBusiness',

  // GA4
  gaPropertyId: 'G-XXXXXXXXXX', // TODO: Replace with actual GA4 Measurement ID
};

// Page-level SEO config
export const pages = {
  home: {
    title: 'Handyman Services in Parksville & Qualicum Beach',
    description: 'Trusted local handyman in Parksville, Qualicum Beach & Oceanside for deck repair, drywall, gutter cleaning, fence repair, and more. Free estimates. Same-week service available.',
    keyword: 'handyman parksville',
  },
  services: {
    deckRepair: {
      title: 'Deck Repair & Maintenance in Parksville | Local Experts',
      description: 'Professional deck repair, staining & sealing in Parksville. Rotten boards, sagging, ledger damage fixed. Coastal weather specialists. Free estimates.',
      keyword: 'deck repair parksville',
      slug: 'deck-repair',
    },
    drywallRepair: {
      title: 'Drywall Repair in Parksville & Qualicum Beach',
      description: 'Professional drywall patching, mudding, and finishing. Holes, cracks, water damage repaired.',
      keyword: 'drywall repair parksville',
      slug: 'drywall-repair',
    },
    fenceRepair: {
      title: 'Fence & Gate Repair in Parksville | Expert Service',
      description: 'Fence repair, gate installation, and wood treatment in Parksville. Sagging, rotten, and storm damage fixed.',
      keyword: 'fence repair parksville',
      slug: 'fence-repair',
    },
    gutterRepair: {
      title: 'Gutter Cleaning & Repair in Qualicum Beach',
      description: 'Professional gutter cleaning, repair, and installation. Keep fir needles and leaves out.',
      keyword: 'gutter cleaning qualicum beach',
      slug: 'gutter-repair',
    },
    bathroomFixtures: {
      title: 'Bathroom Fixture Installation & Repair in Parksville',
      description: 'Faucet repair, toilet installation, and fixture upgrades. Expert service, clean work.',
      keyword: 'bathroom fixture repair parksville',
      slug: 'bathroom-fixtures',
    },
    doorWindowRepair: {
      title: 'Door & Window Repair in Parksville & Oceanside',
      description: 'Repair stuck windows, fix door frames, and replace weatherstripping. Fast, local service.',
      keyword: 'door repair parksville',
      slug: 'door-window-repair',
    },
    furnitureAssembly: {
      title: 'Furniture Assembly & TV Mounting in Parksville',
      description: 'Professional furniture assembly and flat-screen TV mounting. IKEA, store purchases, and more.',
      keyword: 'furniture assembly parksville',
      slug: 'furniture-assembly',
    },
    pressureWashing: {
      title: 'Pressure Washing Services in Qualicum Beach & Oceanside',
      description: 'Deck cleaning, house washing, and driveway pressure washing. Restore your home.',
      keyword: 'pressure washing qualicum beach',
      slug: 'pressure-washing',
    },
    oddJobs: {
      title: 'Small Renovation & Odd Jobs in Parksville',
      description: 'Small renovation projects, odd jobs, and home repairs. Whatever you need done right.',
      keyword: 'odd jobs parksville',
      slug: 'small-renovations',
    },
  },
  areas: {
    parksville: {
      title: 'Handyman Services in Parksville | Local Experts',
      description: 'Serving Parksville residents with deck repair, gutter cleaning, fence repair, and more.',
      keyword: 'handyman parksville',
      slug: 'parksville',
    },
    qualicumBeach: {
      title: 'Handyman Services in Qualicum Beach | Expert Repairs',
      description: 'Local handyman service in Qualicum Beach for gutter cleaning, deck maintenance, and coastal home repairs.',
      keyword: 'handyman qualicum beach',
      slug: 'qualicum-beach',
    },
  },
  blog: {
    pricingGuide: {
      title: "What Does a Handyman Cost in Parksville? (2026 Guide)",
      description: 'Realistic handyman rates and project estimates for the Parksville area. Know what to expect.',
      keyword: 'handyman cost parksville',
      slug: 'handyman-pricing-bc',
    },
    faq: {
      title: 'Handyman FAQ | Parksville & Qualicum Beach',
      description: 'Answers to common questions about hiring a handyman in Parksville.',
      keyword: 'handyman faq parksville',
      slug: 'faq',
    },
  },
};
