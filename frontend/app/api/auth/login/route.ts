import { NextRequest, NextResponse } from 'next/server';

const DEMO_USERS = [
  {
    _id: 'usr_admin_001',
    name: 'WareIQ Master Admin',
    email: 'admin@wareiq-demo.com',
    role: 'admin',
    companyName: 'WareIQ India Logistics HQ',
    phone: '+91 98765 43210',
    isActive: true,
  },
  {
    _id: 'usr_ops_002',
    name: 'Operations Dispatch Manager',
    email: 'ops@wareiq-demo.com',
    role: 'operations',
    companyName: 'WareIQ Bhiwandi Central FC',
    phone: '+91 98765 43211',
    isActive: true,
  },
  {
    _id: 'usr_merchant_003',
    name: 'Manoj Arja (Demo Merchant)',
    email: 'demo@brandmerchant.com',
    role: 'customer',
    companyName: 'Acme D2C Brands India',
    phone: '+91 98765 43212',
    isActive: true,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const matchedUser = DEMO_USERS.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      // Allow any demo user fallback with standard password
      if (password === 'Password@123' || password === 'demo123') {
        const fallbackUser = {
          _id: `usr_demo_${Date.now()}`,
          name: cleanEmail.split('@')[0].toUpperCase(),
          email: cleanEmail,
          role: cleanEmail.includes('admin') ? 'admin' : cleanEmail.includes('ops') ? 'operations' : 'customer',
          companyName: 'Demo Logistics Enterprise',
          phone: '+91 98000 00000',
          isActive: true,
        };

        return NextResponse.json({
          success: true,
          message: 'Authentication successful',
          data: {
            token: `wareiq_token_${fallbackUser._id}_${Date.now()}`,
            user: fallbackUser,
          },
        });
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials. Use one of the 1-Click Demo Persona buttons above.',
        },
        { status: 401 }
      );
    }

    // Check demo password
    if (password !== 'Password@123' && password !== 'admin' && password !== 'demo') {
      return NextResponse.json(
        { success: false, message: 'Invalid password. Demo password is: Password@123' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      data: {
        token: `wareiq_token_${matchedUser._id}_${Date.now()}`,
        user: matchedUser,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
