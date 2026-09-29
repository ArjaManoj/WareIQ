import { NextRequest, NextResponse } from 'next/server';

const ORDERS_DATABASE = [
  {
    _id: 'ord_001',
    orderId: 'WIQ-ORD-1001',
    customerName: 'Ananya Sharma',
    channel: 'D2C',
    orderDate: '2026-09-28T14:00:00.000Z',
    fulfillmentCenter: 'WareIQ Delhi NCR Fulfillment Hub',
    items: [
      { sku: 'WIQ-BEA-001', name: 'Vitamin C Brightening Serum (30ml)', quantity: 2, unitPrice: 799 },
    ],
    totalItems: 2,
    totalAmount: 1598,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    shippingStatus: 'In Transit',
    courier: 'Delhivery',
    awbNumber: 'WIQ-AWB-2026-1001',
    deliveryCity: 'Jaipur',
    pincode: '302001',
    expectedDeliveryDate: '2026-09-30T16:00:00.000Z',
  },
  {
    _id: 'ord_002',
    orderId: 'WIQ-ORD-1002',
    customerName: 'Rajesh Nair',
    channel: 'Marketplace',
    orderDate: '2026-09-27T18:00:00.000Z',
    fulfillmentCenter: 'WareIQ Bengaluru Tech Logistics Center',
    items: [
      { sku: 'WIQ-ELE-201', name: 'True Wireless Active ANC Earbuds', quantity: 1, unitPrice: 2499 },
    ],
    totalItems: 1,
    totalAmount: 2499,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    shippingStatus: 'Delivered',
    courier: 'BlueDart',
    awbNumber: 'WIQ-AWB-2026-1002',
    deliveryCity: 'Chennai',
    pincode: '600018',
    expectedDeliveryDate: '2026-09-29T13:15:00.000Z',
  },
  {
    _id: 'ord_003',
    orderId: 'WIQ-ORD-1003',
    customerName: 'Devika Patel',
    channel: 'D2C',
    orderDate: '2026-09-29T08:00:00.000Z',
    fulfillmentCenter: 'WareIQ Mumbai Mega Gateway',
    items: [
      { sku: 'WIQ-APP-101', name: 'Organic Cotton Oversized Tee (Navy - M)', quantity: 1, unitPrice: 1299 },
    ],
    totalItems: 1,
    totalAmount: 1299,
    paymentStatus: 'COD',
    fulfillmentStatus: 'Fulfilled',
    shippingStatus: 'NDR',
    courier: 'Xpressbees',
    awbNumber: 'WIQ-AWB-2026-1003',
    deliveryCity: 'Ahmedabad',
    pincode: '380015',
    expectedDeliveryDate: '2026-09-30T18:00:00.000Z',
  },
  {
    _id: 'ord_004',
    orderId: 'WIQ-ORD-1004',
    customerName: 'Suresh Menon',
    channel: 'Quick Commerce',
    orderDate: '2026-09-27T09:30:00.000Z',
    fulfillmentCenter: 'WareIQ Bengaluru Tech Logistics Center',
    items: [
      { sku: 'WIQ-NUT-301', name: 'Plant-Based High Protein Isolate (1kg)', quantity: 2, unitPrice: 1899 },
    ],
    totalItems: 2,
    totalAmount: 3798,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Fulfilled',
    shippingStatus: 'Delivered',
    courier: 'Shadowfax',
    awbNumber: 'WIQ-AWB-2026-1004',
    deliveryCity: 'Bengaluru',
    pincode: '560034',
    expectedDeliveryDate: '2026-09-27T18:00:00.000Z',
  },
  {
    _id: 'ord_005',
    orderId: 'WIQ-ORD-1005',
    customerName: 'Kunal Verma',
    channel: 'B2B',
    orderDate: '2026-09-29T10:15:00.000Z',
    fulfillmentCenter: 'WareIQ Delhi NCR Fulfillment Hub',
    items: [
      { sku: 'WIQ-HOM-401', name: 'Ergonomic Memory Foam Lumbar Cushion', quantity: 20, unitPrice: 650 },
    ],
    totalItems: 20,
    totalAmount: 13000,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Picked',
    shippingStatus: 'Order Confirmed',
    courier: 'Delhivery',
    awbNumber: 'WIQ-AWB-2026-1005',
    deliveryCity: 'Chandigarh',
    pincode: '160017',
    expectedDeliveryDate: '2026-10-01T12:00:00.000Z',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let results = [...ORDERS_DATABASE];

  if (status && status !== 'All') {
    results = results.filter((o) => o.shippingStatus.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (o) =>
        o.orderId.toLowerCase().includes(q) ||
        o.awbNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    data: results,
    meta: {
      total: results.length,
      page: 1,
      limit: 20,
    },
  });
}
