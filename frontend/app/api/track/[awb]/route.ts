import { NextRequest, NextResponse } from 'next/server';

const MOCK_SHIPMENTS: Record<string, any> = {
  'WIQ-AWB-2026-1001': {
    awbNumber: 'WIQ-AWB-2026-1001',
    orderId: 'WIQ-ORD-1001',
    courier: 'Delhivery Surface HD',
    origin: 'WareIQ Delhi NCR Fulfillment Hub',
    destination: 'Jaipur, Rajasthan (302001)',
    currentStatus: 'In Transit',
    estimatedDelivery: 'Tomorrow, 4:00 PM',
    carrierTrackingUrl: 'https://www.delhivery.com/track/package/WIQ-AWB-2026-1001',
    events: [
      {
        status: 'In Transit',
        location: 'Jaipur Gateway Transit Facility',
        description: 'Shipment bag sorted and dispatched on local connection',
        timestamp: '2026-09-29T11:45:00.000Z',
      },
      {
        status: 'Dispatched',
        location: 'WareIQ Delhi NCR Fulfillment Hub',
        description: 'Package handed over to carrier partner Delhivery',
        timestamp: '2026-09-28T19:30:00.000Z',
      },
      {
        status: 'Picked & Packed',
        location: 'WareIQ Delhi NCR Fulfillment Hub',
        description: 'Order picked from Zone A-14 and barcoded with security seal',
        timestamp: '2026-09-28T16:15:00.000Z',
      },
      {
        status: 'Order Confirmed',
        location: 'WareIQ Delhi NCR Fulfillment Hub',
        description: 'Inventory allocated via WareIQ Smart Placement Engine',
        timestamp: '2026-09-28T14:00:00.000Z',
      },
    ],
  },
  'WIQ-AWB-2026-1002': {
    awbNumber: 'WIQ-AWB-2026-1002',
    orderId: 'WIQ-ORD-1002',
    courier: 'BlueDart Air Apex',
    origin: 'WareIQ Bengaluru Tech Logistics Center',
    destination: 'Chennai, Tamil Nadu (600018)',
    currentStatus: 'Delivered',
    estimatedDelivery: 'Delivered on 29 Sep 2026, 1:15 PM',
    carrierTrackingUrl: 'https://www.bluedart.com',
    events: [
      {
        status: 'Delivered',
        location: 'Chennai Delivery Hub',
        description: 'Package delivered to recipient Rajesh Nair (OTP Verified)',
        timestamp: '2026-09-29T13:15:00.000Z',
      },
      {
        status: 'Out for Delivery',
        location: 'Chennai T. Nagar Hub',
        description: 'Shipment assigned to delivery rider Arun K.',
        timestamp: '2026-09-29T09:30:00.000Z',
      },
      {
        status: 'In Transit',
        location: 'Bengaluru Airport Air Gateway',
        description: 'Airlifted on flight 6E-442 to Chennai Hub',
        timestamp: '2026-09-28T22:00:00.000Z',
      },
      {
        status: 'Dispatched',
        location: 'WareIQ Bengaluru Tech Logistics Center',
        description: 'Handed over to BlueDart Express',
        timestamp: '2026-09-28T18:00:00.000Z',
      },
    ],
  },
  'WIQ-AWB-2026-1003': {
    awbNumber: 'WIQ-AWB-2026-1003',
    orderId: 'WIQ-ORD-1003',
    courier: 'Xpressbees Surface',
    origin: 'WareIQ Mumbai Mega Gateway',
    destination: 'Ahmedabad, Gujarat (380015)',
    currentStatus: 'NDR',
    estimatedDelivery: 'Re-attempt scheduled for tomorrow',
    carrierTrackingUrl: 'https://www.xpressbees.com',
    events: [
      {
        status: 'NDR',
        location: 'Ahmedabad Delivery Center',
        description: 'Delivery attempted: Customer phone unreachable. Smart WhatsApp resolution triggered.',
        timestamp: '2026-09-29T14:20:00.000Z',
      },
      {
        status: 'Out for Delivery',
        location: 'Ahmedabad Delivery Hub',
        description: 'Dispatched for morning delivery route',
        timestamp: '2026-09-29T08:45:00.000Z',
      },
      {
        status: 'In Transit',
        location: 'Mumbai - Surat - Ahmedabad Linehaul',
        description: 'Surface linehaul truck arrived at destination gateway',
        timestamp: '2026-09-28T23:10:00.000Z',
      },
      {
        status: 'Dispatched',
        location: 'WareIQ Mumbai Mega Gateway (Bhiwandi)',
        description: 'Handed over to carrier partner Xpressbees',
        timestamp: '2026-09-28T17:30:00.000Z',
      },
    ],
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: { awb: string } }
) {
  const awb = params.awb ? decodeURIComponent(params.awb).trim().toUpperCase() : '';

  if (!awb) {
    return NextResponse.json(
      { success: false, message: 'AWB tracking number is required' },
      { status: 400 }
    );
  }

  // Check known shipments
  if (MOCK_SHIPMENTS[awb]) {
    return NextResponse.json({
      success: true,
      data: MOCK_SHIPMENTS[awb],
    });
  }

  // If query is for other common prefixes or demo IDs, generate realistic tracking
  const generatedData = {
    awbNumber: awb,
    orderId: `WIQ-ORD-${awb.replace(/\D/g, '').slice(-4) || '9901'}`,
    courier: awb.includes('BLR') ? 'BlueDart Air' : awb.includes('DEL') ? 'Delhivery HD' : 'Shadowfax Prime',
    origin: awb.includes('BLR')
      ? 'WareIQ Bengaluru Tech Logistics Center'
      : awb.includes('DEL')
      ? 'WareIQ Delhi NCR Fulfillment Hub'
      : 'WareIQ Mumbai Mega Gateway',
    destination: 'Destination Delivery Hub (Active Pin)',
    currentStatus: 'In Transit',
    estimatedDelivery: 'Within 24-48 Business Hours',
    events: [
      {
        status: 'In Transit',
        location: 'Regional Consolidation Gateway',
        description: `Active transit scan recorded for ${awb}`,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        status: 'Dispatched',
        location: 'WareIQ Central Fulfillment Center',
        description: 'Shipment bag manifests sealed and handed over to carrier network',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      },
      {
        status: 'Picked & Packed',
        location: 'WareIQ Central Fulfillment Center',
        description: 'Multi-item QC passed and tamper-evident packaging applied',
        timestamp: new Date(Date.now() - 3600000 * 16).toISOString(),
      },
      {
        status: 'Order Confirmed',
        location: 'WareIQ Fulfillment Engine',
        description: 'Fulfillment order routed to closest node for same-day dispatch',
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
    ],
  };

  return NextResponse.json({
    success: true,
    data: generatedData,
  });
}
