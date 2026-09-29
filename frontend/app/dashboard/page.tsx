'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiClient } from '@/lib/api';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Boxes,
  ArrowRight,
  TrendingUp,
  Activity,
  Plus,
  Navigation,
} from 'lucide-react';

interface DashboardSummary {
  kpis: {
    totalOrders: number;
    inTransit: number;
    delivered: number;
    ndr: number;
    rto: number;
    slaSuccessRate: number;
    inventoryAlerts: number;
  };
  inventory: {
    totalSKUs: number;
    lowStock: number;
    outOfStock: number;
    healthy: number;
  };
  channelStats: { channel: string; count: number; revenue: number }[];
  recentOrders: any[];
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await apiClient<DashboardSummary>('/analytics/summary');
        setSummary(res.data);
      } catch (e) {
        console.info('Loading demo summary metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const kpiCards = [
    {
      label: 'Total Orders',
      value: summary?.kpis.totalOrders ?? 5,
      change: '+14% vs last week',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'In Transit',
      value: summary?.kpis.inTransit ?? 2,
      change: 'On-schedule linehaul',
      icon: Truck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Delivered (SLA Met)',
      value: summary?.kpis.delivered ?? 2,
      change: '99.2% on-time rate',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'NDR Active',
      value: summary?.kpis.ndr ?? 1,
      change: 'WhatsApp bot triggered',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'RTO Returned',
      value: summary?.kpis.rto ?? 0,
      change: 'Lowest tier benchmark',
      icon: RotateCcw,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      label: 'Low / Out of Stock',
      value: summary?.kpis.inventoryAlerts ?? 2,
      change: 'Action recommended',
      icon: Boxes,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <DashboardLayout moduleName="Fulfillment Command Center">
      <div className="space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <Card key={idx} hoverEffect className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {kpi.label}
                    </span>
                    <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  {loading ? (
                    <Skeleton className="h-8 w-16 my-2" />
                  ) : (
                    <div className="text-2xl font-black text-slate-900 mt-2">{kpi.value}</div>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">{kpi.change}</div>
              </Card>
            );
          })}
        </div>

        {/* Quick Operations Actions */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold flex items-center justify-center md:justify-start gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Pan-India Smart Inventory Placement Engine Active
            </h3>
            <p className="text-xs text-blue-200">
              Orders placed before 4:00 PM are automatically routed to the nearest Tier 1 fulfillment node.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/orders">
              <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-blue-50 font-bold">
                View All Orders
              </Button>
            </Link>
            <Link href="/dashboard/inventory">
              <Button variant="outline" size="sm" className="border-blue-400 text-white hover:bg-blue-900/40">
                Adjust Inventory
              </Button>
            </Link>
          </div>
        </div>

        {/* Two-Column Grid: Recent Orders & Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Orders & Consignments
              </h3>
              <Link
                href="/dashboard/orders"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View Orders Table <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5 pl-5">Order ID / AWB</th>
                      <th className="p-3.5">Customer & City</th>
                      <th className="p-3.5">Channel</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 pr-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {summary?.recentOrders && summary.recentOrders.length > 0 ? (
                      summary.recentOrders.map((order: any) => (
                        <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 pl-5">
                            <div className="font-bold font-mono text-slate-900">{order.orderId}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{order.awbNumber}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="text-slate-900 font-semibold">{order.customerName}</div>
                            <div className="text-[10px] text-slate-400">{order.deliveryCity}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700">
                              {order.channel}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <Badge status={order.shippingStatus || order.fulfillmentStatus}>
                              {order.shippingStatus || order.fulfillmentStatus}
                            </Badge>
                          </td>
                          <td className="p-3.5 font-bold text-slate-900">
                            {formatINR(order.totalAmount)}
                          </td>
                          <td className="p-3.5 pr-5 text-right">
                            <Link href={`/track?awb=${order.awbNumber}`}>
                              <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 ml-auto">
                                <Navigation className="w-3 h-3" /> Track
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-400 text-xs">
                          No recent orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Channel Breakdown & Health */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Orders by Commerce Channel
              </h4>
              <div className="space-y-3">
                {[
                  { channel: 'D2C Store (Shopify)', percentage: 45, count: '1,840 orders', color: 'bg-blue-600' },
                  { channel: 'Amazon Seller Flex', percentage: 30, count: '1,220 orders', color: 'bg-amber-500' },
                  { channel: 'Quick Commerce (Blinkit/Zepto)', percentage: 15, count: '610 orders', color: 'bg-purple-600' },
                  { channel: 'B2B Modern Trade', percentage: 10, count: '410 orders', color: 'bg-slate-800' },
                ].map((ch, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700">{ch.channel}</span>
                      <span className="text-slate-500 text-[11px]">{ch.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${ch.color} h-full rounded-full`} style={{ width: `${ch.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-3 bg-slate-900 text-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery SLA Performance
              </h4>
              <div className="text-3xl font-black text-emerald-400">
                {summary?.kpis.slaSuccessRate ?? 99.2}%
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                99.2% of consignments were delivered within the promised 24-48 hour window across all carrier linehauls.
              </p>
              <Link href="/dashboard/analytics" className="inline-block pt-2 text-xs font-bold text-blue-400 hover:text-blue-300">
                View Full SLA Analytics →
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
