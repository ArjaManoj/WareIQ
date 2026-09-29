import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalOrders: 14820,
        ordersGrowth: '+18.4%',
        onTimeDeliveryRate: 98.4,
        avgFulfillmentTimeHours: 2.1,
        sameDayDispatchRate: 94.2,
        activeSkus: 1420,
        activeWarehouses: 6,
        rtoRate: 4.8,
        rtoReduction: '-32%',
      },
      channelDistribution: [
        { name: 'D2C Brand Store', value: 48, orders: 7113, color: '#3B82F6' },
        { name: 'Amazon India', value: 28, orders: 4150, color: '#F59E0B' },
        { name: 'Flipkart', value: 14, orders: 2075, color: '#10B981' },
        { name: 'Quick Commerce (Blinkit/Zepto)', value: 10, orders: 1482, color: '#8B5CF6' },
      ],
      weeklyFulfillmentTrend: [
        { day: 'Mon', dispatched: 2450, delivered: 2280, ndr: 32 },
        { day: 'Tue', dispatched: 2890, delivered: 2710, ndr: 41 },
        { day: 'Wed', dispatched: 3120, delivered: 2980, ndr: 28 },
        { day: 'Thu', dispatched: 2940, delivered: 2850, ndr: 35 },
        { day: 'Fri', dispatched: 3410, delivered: 3290, ndr: 44 },
        { day: 'Sat', dispatched: 3820, delivered: 3640, ndr: 39 },
        { day: 'Sun', dispatched: 2650, delivered: 2580, ndr: 21 },
      ],
      fcCapacityBreakdown: [
        { hub: 'Delhi NCR (Gurugram)', capacity: 78, ordersToday: 1240 },
        { hub: 'Mumbai (Bhiwandi)', capacity: 84, ordersToday: 1580 },
        { hub: 'Bengaluru (Hosakote)', capacity: 69, ordersToday: 920 },
        { hub: 'Hyderabad (Medchal)', capacity: 62, ordersToday: 640 },
        { hub: 'Kolkata (Dankuni)', capacity: 58, ordersToday: 510 },
        { hub: 'Pune (Chakan)', capacity: 72, ordersToday: 730 },
      ],
    },
  });
}
