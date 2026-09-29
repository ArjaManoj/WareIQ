'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/api';
import {
  ShieldAlert,
  Inbox,
  Users,
  PackageCheck,
  Boxes,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalLeads: 3,
    newLeads: 1,
    qualifiedLeads: 1,
    totalUsers: 3,
    totalOrders: 5,
    activeFCs: 6,
  });

  return (
    <AdminLayout moduleName="Executive Command Center">
      <div className="space-y-8">
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <Badge variant="neutral" className="bg-slate-950 text-amber-300 border-none font-bold">
              👑 Master HQ Control Tower
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Enterprise Operations & Governance Console
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Manage enterprise demo leads, provision client merchant access, oversee pan-India fulfillment center topology, and simulate carrier shipment events.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/admin/leads">
              <Button variant="secondary" size="md" className="bg-slate-950 text-white hover:bg-slate-900 font-bold">
                Open Lead CRM ({stats.totalLeads})
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" size="md" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
                Manage Users
              </Button>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-950 border-slate-800 text-slate-100 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Enterprise Leads</span>
              <Inbox className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{stats.totalLeads}</div>
            <div className="text-[10px] text-slate-400">{stats.newLeads} new inbound requests</div>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-slate-100 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Users</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-blue-400">{stats.totalUsers}</div>
            <div className="text-[10px] text-slate-400">Admin, Ops & Customer accounts</div>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-slate-100 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Consignments</span>
              <PackageCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{stats.totalOrders}</div>
            <div className="text-[10px] text-slate-400">Multi-carrier routed</div>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-slate-100 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Fulfillment Nodes</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{stats.activeFCs}</div>
            <div className="text-[10px] text-slate-400">North, West, South, East</div>
          </Card>
        </div>

        {/* Quick Admin Action Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-950 border-slate-800 text-slate-200 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Lead CRM Pipeline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review website inquiries, update qualification stages (Qualified, Proposal, Converted), and assign internal operations notes.
              </p>
            </div>
            <Link href="/admin/leads">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                Open CRM Pipeline →
              </Button>
            </Link>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-slate-200 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">User & Role Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                View registered merchants, promote accounts to operations/admin privileges, or toggle account activation status.
              </p>
            </div>
            <Link href="/admin/users">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                Manage User Permissions →
              </Button>
            </Link>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-slate-200 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Shipment Event Simulator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manually record live delivery events (Dispatched, Out for Delivery, Delivered, NDR) against existing AWBs to test buyer timelines.
              </p>
            </div>
            <Link href="/admin/orders">
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Event Simulator →
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
