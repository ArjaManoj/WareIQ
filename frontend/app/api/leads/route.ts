import { NextRequest, NextResponse } from 'next/server';

let LEADS_STORAGE = [
  {
    _id: 'lead_001',
    firstName: 'Vikram',
    lastName: 'Singhania',
    email: 'vikram@lumoscosmetics.in',
    phone: '9820198201',
    companyName: 'Lumos Cosmetics India',
    operatingLocation: 'Mumbai & Delhi NCR',
    enquiryType: 'D2C Fulfillment',
    challenges: 'High RTO rate (34%) and delayed 5-day delivery times across tier 2 cities.',
    monthlyOrders: '10,000 - 25,000 orders/mo',
    warehouseCount: 'Currently self-fulfilled from 1 warehouse',
    businessLocation: 'Mumbai',
    requirements: 'Pan-India 2-day delivery with automated NDR WhatsApp bot.',
    source: 'Google Search',
    status: 'Qualified',
    notes: 'High potential enterprise lead. Needs same-day dispatch cutoff till 4 PM.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    _id: 'lead_002',
    firstName: 'Priya',
    lastName: 'Nambiar',
    email: 'priya@pureearthfoods.com',
    phone: '9945099450',
    companyName: 'Pure Earth Organic Superfoods',
    operatingLocation: 'Bengaluru',
    enquiryType: 'Quick Commerce Fulfillment',
    challenges: 'Stockouts on Blinkit and Zepto dark stores causing 40% loss of daily sales.',
    monthlyOrders: '25,000+ orders/mo',
    warehouseCount: 'Looking for 4 regional staging hubs',
    businessLocation: 'Bengaluru',
    requirements: 'Dark store replenishment micro-SLAs within 2 hours.',
    source: 'LinkedIn',
    status: 'Proposal',
    notes: 'Draft proposal shared for Bangalore, Mumbai, and Gurgaon hubs.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: 'lead_003',
    firstName: 'Rohan',
    lastName: 'Kapoor',
    email: 'rohan@gearupfit.co',
    phone: '9811298112',
    companyName: 'GearUp Fitness Tech',
    operatingLocation: 'Delhi NCR',
    enquiryType: 'Marketplace Fulfillment',
    challenges: 'Strict Amazon Seller Flex and Flipkart SLA compliance penalties.',
    monthlyOrders: '5,000 - 10,000 orders/mo',
    warehouseCount: '1 facility',
    businessLocation: 'Gurugram',
    requirements: 'Amazon Seller Flex prep and appointment scheduling.',
    source: 'Website Direct Demo Request',
    status: 'New',
    notes: 'Requested immediate callback for Q4 festive sale preparation.',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: LEADS_STORAGE,
    meta: {
      total: LEADS_STORAGE.length,
      page: 1,
      limit: 20,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      monthlyOrders,
      enquiryType,
      challenges,
    } = body;

    if (!firstName || !email || !phone || !companyName) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required contact details.' },
        { status: 400 }
      );
    }

    const newLead = {
      _id: `lead_${Date.now()}`,
      firstName,
      lastName: lastName || '',
      email,
      phone,
      companyName,
      operatingLocation: body.operatingLocation || 'Pan-India',
      enquiryType: enquiryType || 'D2C Fulfillment',
      challenges: challenges || 'Accelerating multi-node fulfillment and same-day delivery',
      monthlyOrders: monthlyOrders || '5,000 - 10,000 orders/mo',
      warehouseCount: body.warehouseCount || 'Multi-node fulfillment hub setup',
      businessLocation: body.businessLocation || 'India',
      requirements: body.requirements || 'End-to-end WareIQ logistics onboarding',
      source: 'Website Contact Page',
      status: 'New',
      notes: 'Submitted via live website inquiry form.',
      createdAt: new Date().toISOString(),
    };

    LEADS_STORAGE.unshift(newLead);

    return NextResponse.json(
      {
        success: true,
        message:
          'Your fulfillment consultation request has been received! A WareIQ logistics solution architect will contact you within 4 business hours.',
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
