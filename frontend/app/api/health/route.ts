import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'healthy',
    service: 'WareIQ Fulfillment Platform (Next.js API Engine)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? process.uptime() : 100,
  });
}
