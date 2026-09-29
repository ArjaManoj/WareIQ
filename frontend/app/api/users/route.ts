import { NextRequest, NextResponse } from 'next/server';

let USERS_STORE = [
  {
    _id: 'usr_admin_001',
    name: 'WareIQ Master Admin',
    email: 'admin@wareiq-demo.com',
    role: 'admin',
    companyName: 'WareIQ India Logistics HQ',
    phone: '+91 98765 43210',
    isActive: true,
    createdAt: '2026-01-15T09:00:00.000Z',
  },
  {
    _id: 'usr_ops_002',
    name: 'Operations Dispatch Manager',
    email: 'ops@wareiq-demo.com',
    role: 'operations',
    companyName: 'WareIQ Bhiwandi Central FC',
    phone: '+91 98765 43211',
    isActive: true,
    createdAt: '2026-02-01T10:30:00.000Z',
  },
  {
    _id: 'usr_merchant_003',
    name: 'Manoj Arja (Demo Merchant)',
    email: 'demo@brandmerchant.com',
    role: 'customer',
    companyName: 'Acme D2C Brands India',
    phone: '+91 98765 43212',
    isActive: true,
    createdAt: '2026-03-10T14:15:00.000Z',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const role = searchParams.get('role');

  let list = [...USERS_STORE];

  if (role && role !== 'All') {
    list = list.filter((u) => u.role === role);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.companyName.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    data: list,
    meta: {
      total: list.length,
      page: 1,
      limit: 50,
    },
  });
}
