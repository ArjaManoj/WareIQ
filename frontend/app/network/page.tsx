'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin,
  Search,
  Filter,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { apiClient } from '@/lib/api';

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

const FALLBACK_FCS: FulfillmentCenter[] = [
  {
    _id: '1',
    name: 'WareIQ Delhi NCR Fulfillment Hub',
    city: 'Gurugram',
    state: 'Haryana',
    zone: 'North',
    address: 'Plot 42, Sector 37 Logistics Park, Pace City II',
    pincode: '122001',
    services: ['Same-Day Dispatch', 'D2C Fulfillment', 'Marketplace Staging', 'Cold Storage'],
    operatingStatus: 'Active',
    capacityPercentage: 78,
  },
  {
    _id: '2',
    name: 'WareIQ Mumbai Mega Gateway',
    city: 'Bhiwandi',
    state: 'Maharashtra',
    zone: 'West',
    address: 'Bldg B3, Indian Logistics City, Mankoli',
    pincode: '421302',
    services: ['Same-Day Dispatch', 'B2B Palletizing', 'Dark Store Staging', 'SOR Hub'],
    operatingStatus: 'Active',
    capacityPercentage: 84,
  },
  {
    _id: '3',
    name: 'WareIQ Bengaluru Tech Logistics Center',
    city: 'Bengaluru',
    state: 'Karnataka',
    zone: 'South',
    address: 'Indospace Industrial Park, Hosakote High-Tech Zone',
    pincode: '562114',
    services: ['Same-Day Delivery', 'Quick Commerce Dark Store Staging', 'Serial Tracking'],
    operatingStatus: 'Active',
    capacityPercentage: 69,
  },
  {
    _id: '4',
    name: 'WareIQ Hyderabad Regional FC',
    city: 'Hyderabad',
    state: 'Telangana',
    zone: 'South',
    address: 'Survey 108, Medchal Industrial Corridor',
    pincode: '501401',
    services: ['D2C Fulfillment', 'Pharma & Wellness Storage', 'Smart Routing'],
    operatingStatus: 'Active',
    capacityPercentage: 62,
  },
  {
    _id: '5',
    name: 'WareIQ Kolkata Gateway Hub',
    city: 'Kolkata',
    state: 'West Bengal',
    zone: 'East',
    address: 'NH-2 Industrial Cluster, Dankuni',
    pincode: '712311',
    services: ['East Hub Transshipment', 'Marketplace Inbounding', 'Multi-carrier Sorting'],
    operatingStatus: 'Active',
    capacityPercentage: 58,
  },
  {
    _id: '6',
    name: 'WareIQ Pune Fulfillment Center',
    city: 'Pune',
    state: 'Maharashtra',
    zone: 'West',
    address: 'MIDC Phase II, Chakan Logistics Park',
    pincode: '410501',
    services: ['Automated Sorting', 'Apparel QC Station', 'D2C Next-Day'],
    operatingStatus: 'Active',
    capacityPercentage: 72,
  },
];

export default function NetworkPage() {
  const [centers, setCenters] = useState<FulfillmentCenter[]>(FALLBACK_FCS);
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFCs = async () => {
      try {
        setLoading(true);
        const res = await apiClient<FulfillmentCenter[]>('/fulfillment-centers');
        if (res.data && res.data.length > 0) {
          setCenters(res.data);
        }
      } catch (e) {
        console.info('Using fallback FC network nodes');
      } finally {
        setLoading(false);
      }
    };
    fetchFCs();
  }, []);

  const filteredCenters = centers.filter((fc) => {
    const matchesZone = selectedZone === 'All' || fc.zone === selectedZone;
    const matchesSearch =
      searchQuery === '' ||
      fc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fc.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-3">
            <Badge variant="blue" className="bg-blue-900/50 text-blue-300 border-blue-700">
              Pan-India Network
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Strategic Pan-India Fulfillment Centers
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Public network information and demonstration interface. Locate WareIQ Tier 1 and Tier 2 fulfillment hubs providing same-day dispatch and next-day deliveries across India.
            </p>
          </div>
        </section>

        {/* Network Map Topology Visual */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  National Fulfillment Nodes
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distributed micro & mega hubs connected by Smart Inventory Placement (SIP) linehaul
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> North Hubs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> West Hubs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> South Hubs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> East Hubs
                </span>
              </div>
            </div>

            {/* Grid of quick zone highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-xs font-bold text-blue-400">North Zone</div>
                <div className="text-sm font-bold text-white mt-1">Delhi NCR (Gurugram)</div>
                <div className="text-[11px] text-slate-400">Covering Delhi, Haryana, Punjab, UP & Rajasthan</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-xs font-bold text-amber-400">West Zone</div>
                <div className="text-sm font-bold text-white mt-1">Mumbai (Bhiwandi) & Pune</div>
                <div className="text-[11px] text-slate-400">Covering Maharashtra, Gujarat & Goa</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-xs font-bold text-emerald-400">South Zone</div>
                <div className="text-sm font-bold text-white mt-1">Bengaluru & Hyderabad</div>
                <div className="text-[11px] text-slate-400">Covering Karnataka, Telangana, Tamil Nadu & Kerala</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                <div className="text-xs font-bold text-purple-400">East Zone</div>
                <div className="text-sm font-bold text-white mt-1">Kolkata (Dankuni)</div>
                <div className="text-[11px] text-slate-400">Gateway to West Bengal, Bihar, Odisha & North East</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Zone pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Zone:
              </span>
              {['All', 'North', 'West', 'South', 'East'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedZone === zone
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, state or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Fulfillment Centers Cards */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((fc) => (
              <Card key={fc._id} hoverEffect className="flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {fc.zone} Zone
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2">{fc.name}</h3>
                    </div>
                    <Badge status="Active">Operational</Badge>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {fc.address}, {fc.city}, {fc.state} - {fc.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Services tags */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Specialized Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {fc.services.map((svc, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Capacity indicator */}
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Live Hub Utilization</span>
                      <span className="font-bold text-slate-800">{fc.capacityPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${fc.capacityPercentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Cutoff: 4:00 PM Daily</span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Inquire for Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-600">No fulfillment centers match your search criteria.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  setSelectedZone('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
