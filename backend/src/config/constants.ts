export const USER_ROLES = {
  ADMIN: 'admin',
  OPERATIONS: 'operations',
  CUSTOMER: 'customer',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const LEAD_STATUSES = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  PROPOSAL: 'Proposal',
  CONVERTED: 'Converted',
  CLOSED: 'Closed',
} as const;

export type LeadStatus = (typeof LEAD_STATUSES)[keyof typeof LEAD_STATUSES];

export const CHANNELS = {
  D2C: 'D2C',
  MARKETPLACE: 'Marketplace',
  QUICK_COMMERCE: 'Quick Commerce',
  B2B: 'B2B',
} as const;

export const SHIPMENT_STATUSES = {
  ORDER_CONFIRMED: 'Order Confirmed',
  PROCESSING: 'Processing',
  PICKED: 'Picked',
  PACKED: 'Packed',
  DISPATCHED: 'Dispatched',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  NDR: 'NDR',
  RTO: 'RTO',
} as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[keyof typeof SHIPMENT_STATUSES];

export const COURIERS = [
  'Delhivery',
  'BlueDart',
  'Xpressbees',
  'Shadowfax',
  'DTDC',
  'Ekart',
] as const;

export const INVENTORY_TRANSACTION_TYPES = {
  INBOUND: 'INBOUND',
  OUTBOUND: 'OUTBOUND',
  RETURN: 'RETURN',
  ADJUSTMENT: 'ADJUSTMENT',
  TRANSFER: 'TRANSFER',
} as const;

export const ZONES = ['North', 'West', 'South', 'East'] as const;

// Official Public WareIQ Services Reference
export const WAREIQ_OFFICIAL_SERVICES = [
  {
    id: 'd2c-fulfillment',
    name: 'D2C Fulfillment',
    tagline: 'Amazon-grade Same-Day & Next-Day Delivery across India',
    description: 'Store inventory closer to customers with our intelligent pan-India fulfillment center network. Achieve up to 40% reduction in shipping transit time and automated Shopify/eCommerce order routing.',
    badge: 'Popular',
    icon: 'Truck',
    features: [
      'Pan-India distributed fulfillment network',
      'Same-day order dispatch cut-offs till 4 PM',
      'Real-time inventory sync across storefronts',
      'Automated pick, pack, and custom branded packaging'
    ],
    idealFor: 'High-growth D2C brands, Shopify & WooCommerce merchants'
  },
  {
    id: 'marketplace-fulfillment',
    name: 'Marketplace Fulfillment',
    tagline: 'Multi-channel compliance for Amazon, Flipkart, Myntra & Nykaa',
    description: 'Ensure 100% SLA compliance and seamless inventory staging for major Indian marketplaces including Amazon FBA / Seller Flex, Flipkart, Myntra, and Nykaa.',
    badge: 'Enterprise',
    icon: 'Store',
    features: [
      'Amazon Seller Flex & FBA prep compliance',
      'Scheduled marketplace appointment bookings',
      'Automated barcoding, labeling, and palletization',
      'Cross-docking and unified inventory allocation'
    ],
    idealFor: 'Omnichannel consumer brands selling on multiple marketplaces'
  },
  {
    id: 'quick-commerce-fulfillment',
    name: 'Quick Commerce Fulfillment',
    tagline: 'Micro-fulfillment & Dark Store Staging for 10-30 min delivery',
    description: 'Fast-track inventory replenishment to Blinkit, Zepto, Swiggy Instamart, and BB Now dark stores with rigorous micro-SLAs and real-time visibility.',
    badge: 'High Velocity',
    icon: 'Zap',
    features: [
      'Hyperlocal dark store supply routing',
      'Low-latency ASN generation and delivery scheduling',
      'Zero-rejection packaging and batch compliance',
      'Dynamic inventory buffering based on stockouts'
    ],
    idealFor: 'FMCG, snacking, cosmetics, and daily essentials brands'
  },
  {
    id: 'b2b-retail-fulfillment',
    name: 'B2B & Retail Distribution',
    tagline: 'Bulk carton & pallet distribution to Modern Trade / General Trade',
    description: 'Enterprise B2B logistics powering distribution to modern trade retail stores (Reliance, Shoppers Stop, DMart) and wholesale stockists with e-way bill generation.',
    badge: 'B2B',
    icon: 'Building2',
    features: [
      'Bulk palletized and cartonized staging',
      'Automated GST E-way bill & ASN creation',
      'Strict retailer-specific inwarding compliance',
      'Full truckload (FTL) and less-than-truckload (LTL) coordination'
    ],
    idealFor: 'Wholesalers, brand manufacturers, large retail suppliers'
  },
  {
    id: 'wareiq-shipping-engine',
    name: 'WareIQ Smart Shipping Engine',
    tagline: 'Multi-courier aggregation with AI-powered courier allocation',
    description: 'Pre-integrated with BlueDart, Delhivery, Xpressbees, DTDC, and Shadowfax. Automatically select the best courier per pincode based on speed, SLA, and cost.',
    badge: 'Smart Logistics',
    icon: 'Navigation',
    features: [
      'Smart Courier Allocation based on live pincode performance',
      'Automated NDR Management & WhatsApp buyer verification',
      'Up to 35% reduction in RTO (Return to Origin) losses',
      'Unified branded order tracking with real-time updates'
    ],
    idealFor: 'All eCommerce businesses needing reliable pan-India shipping'
  },
  {
    id: 'seller-of-record',
    name: 'Seller of Record (SOR)',
    tagline: 'Frictionless multi-state tax compliance & zero-capex expansion',
    description: 'Store stock in 10+ states across India without the burden of setting up local branch offices or state-wise GST registrations.',
    badge: 'Compliance',
    icon: 'ShieldCheck',
    features: [
      'Instant access to multi-state GST registrations',
      'Zero upfront infrastructure or branch setup costs',
      'Complete end-to-end statutory and tax filing compliance',
      'Unified billing and automated input tax credit (ITC) reconciliation'
    ],
    idealFor: 'Rapidly scaling brands aiming for national next-day coverage'
  }
];

export const OFFICIAL_INDUSTRIES = [
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Batch/expiry tracking, temperature-controlled storage, and tamper-proof luxury unboxing.',
    metrics: '99.8% Batch Accuracy'
  },
  {
    name: 'Fashion & Apparel',
    slug: 'fashion-apparel',
    description: 'Multi-size variant management, rapid reverse logistics QC, and high-speed dispatch.',
    metrics: '48h Reverse QC Turnaround'
  },
  {
    name: 'Consumer Electronics & Tech',
    slug: 'electronics-tech',
    description: 'Serial number capture, high-security staging, and insured fragile transit handling.',
    metrics: '100% Serialized Tracking'
  },
  {
    name: 'Health, Wellness & Nutraceuticals',
    slug: 'health-wellness',
    description: 'FIFO/FEFO automated rotation, certified hygienic warehousing, and regulatory compliance.',
    metrics: 'Zero-Expired Dispatch Guarantee'
  },
  {
    name: 'Home, Living & Kitchenware',
    slug: 'home-kitchen',
    description: 'Bulky and fragile item handling, custom bubble packaging, and multi-box order staging.',
    metrics: '< 0.5% Transit Damage Rate'
  },
  {
    name: 'Sports, Fitness & Luggage',
    slug: 'sports-fitness-travel',
    description: 'Volumetric weight optimization and heavy-duty protective packaging solutions.',
    metrics: 'Up to 25% Shipping Cost Savings'
  }
];
