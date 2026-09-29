'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { apiClient } from '@/lib/api';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Truck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

const MONTHLY_ORDER_TREND = [
  { month: 'Apr', orders: 1240, delivered: 1190, ndr: 32, rto: 18 },
  { month: 'May', orders: 1580, delivered: 1510, ndr: 45, rto: 25 },
  { month: 'Jun', orders: 1920, delivered: 1860, ndr: 38, rto: 22 },
  { month: 'Jul', orders: 2450, delivered: 2380, ndr: 42, rto: 28 },
  { month: 'Aug', orders: 3100, delivered: 3020, ndr: 51, rto: 29 },
  { month: 'Sep', orders: 3850, delivered: 3760, ndr: 58, rto: 32 },
];

const COURIER_PERFORMANCE = [
  { courier: 'Delhivery', volume: 1850, onTime: 97.8, avgDays: 1.8 },
  { courier: 'BlueDart', volume: 920, onTime: 98.6, avgDays: 1.4 },
  { courier: 'Xpressbees', volume: 640, onTime: 96.2, avgDays: 2.1 },
  { courier: 'Shadowfax', volume: 440, onTime: 95.9, avgDays: 1.9 },
];

const CHANNEL_DATA = [
  { name: 'Shopify D2C', value: 45, color: '#2563eb' },
  { name: 'Amazon Seller Flex', value: 30, color: '#f59e0b' },
  { name: 'Quick Commerce (Blinkit)', value: 15, color: '#9333ea' },
  { name: 'B2B Modern Trade', value: 10, color: '#0f172a' },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout moduleName="Analytics & Delivery SLAs">
      <div className="space-y-8">
        {/* Header Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Shipped Consignments
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">14,140</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">
              +24% Month-over-Month
            </div>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
              Overall SLA Success Rate
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">98.4%</div>
            <div className="text-[10px] text-slate-500 mt-1">Within 24-48h cutoff</div>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              NDR Auto-Resolution
            </span>
            <div className="text-2xl font-black text-amber-800 mt-1">74.2%</div>
            <div className="text-[10px] text-blue-600 font-semibold mt-1">WhatsApp AI Bot</div>
          </Card>

          <Card className="p-4 border-slate-200">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider">
              Average Transit Time
            </span>
            <div className="text-2xl font-black text-purple-900 mt-1">1.6 Days</div>
            <div className="text-[10px] text-slate-500 mt-1">Pan-India blended</div>
          </Card>
        </div>

        {/* Charts Grid Row 1: Monthly Trend & Channel Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Monthly Trajectory Area Chart */}
          <Card className="lg:col-span-8 p-6 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Monthly Order Volume & Delivery Trajectory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Orders vs Successful SLA Deliveries
                </p>
              </div>
              <Badge variant="blue">FY 2026</Badge>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_ORDER_TREND}>
                  <defs>
                    <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="delivGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    name="Total Orders"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#orderGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="delivered"
                    name="Delivered on SLA"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#delivGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Omnichannel Distribution Pie Chart */}
          <Card className="lg:col-span-4 p-6 border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Fulfillment by Channel
              </h3>
              <p className="text-xs text-slate-500 mb-4">Volume breakdown across retail modes</p>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHANNEL_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {CHANNEL_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              {CHANNEL_DATA.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Charts Grid Row 2: Courier Partner Benchmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-6 p-6 border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Courier SLA On-Time Delivery Comparison (%)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Allocated courier partner performance across pincodes
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COURIER_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="courier" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[90, 100]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="onTime" name="On-Time Delivery %" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="lg:col-span-6 p-6 border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              NDR & RTO Mitigation Performance
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Monthly Non-Delivery Reports vs Final RTO returns
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_ORDER_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ndr"
                    name="NDR Exceptions"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rto"
                    name="Final RTO Returns"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
