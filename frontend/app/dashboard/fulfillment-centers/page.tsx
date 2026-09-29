'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/api';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Activity,
  Layers,
  Search,
  Filter,
} from 'lucide-react';

interface FulfillmentCenter {
  _id: string;
  name: string;
  city: string;
  state: string;
  zone: string;
  address: string;
  pincode: string;
  services: string[];
  operatingStatus: string;
  capacityPercentage: number;
}

export default function DashboardFCPage() {
  const [centers, setCenters] = useState<FulfillmentCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFCs = async () => {
      try {
        setLoading(true);
        const res = await apiClient<FulfillmentCenter[]>('/fulfillment-centers');
        setCenters(res.data);
      } catch (e) {
        console.info('Error loading FCs');
      } finally {
        setLoading(false);
      }
    };
    fetchFCs();
  }, []);

  const filtered = centers.filter((fc) => {
    const matchesZone = selectedZone === 'All' || fc.zone === selectedZone;
    const matchesSearch =
      search === '' ||
      fc.name.toLowerCase().includes(search.toLowerCase()) ||
      fc.city.toLowerCase().includes(search.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <DashboardLayout moduleName="Fulfillment Hubs & Network Status">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">National Fulfillment Infrastructure</h2>
            <p className="text-xs text-slate-500">
              Live capacity utilization and active services across WareIQ nodes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Active Hubs: <strong className="text-blue-600">{centers.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4 border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['All', 'North', 'West', 'South', 'East'].map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    selectedZone === z
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {z} Zone
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hub or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* FC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fc) => (
            <Card key={fc._id} hoverEffect className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {fc.zone} Hub
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{fc.name}</h3>
                </div>
                <Badge status="Active">Online</Badge>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {fc.address}, {fc.city}, {fc.state} - {fc.pincode}
                  </span>
                </div>
              </div>

              {/* Capacities */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Hub Storage Utilization</span>
                  <span className="font-bold text-slate-900">{fc.capacityPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      fc.capacityPercentage > 80 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${fc.capacityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Service tags */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Configured Capabilities:
                </div>
                <div className="flex flex-wrap gap-1">
                  {fc.services.map((svc, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
