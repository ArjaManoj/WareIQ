'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Navigation,
  Search,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Package,
  Building2,
  Info,
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { formatDate, formatDateTime, formatINR } from '@/lib/utils';

interface ShipmentEvent {
  status: string;
  location: string;
  description: string;
  timestamp: string;
}

interface TrackingData {
  shipment: {
    awbNumber: string;
    orderId: string;
    courier: string;
    origin: string;
    destination: string;
    currentStatus: string;
    estimatedDelivery: string;
    deliveredAt?: string;
    events: ShipmentEvent[];
  };
  order?: {
    orderId: string;
    customerName: string;
    channel: string;
    orderDate: string;
    fulfillmentCenter: string;
    items: { sku: string; name: string; quantity: number; unitPrice: number }[];
    totalAmount: number;
    paymentStatus: string;
    deliveryCity: string;
    pincode: string;
    expectedDeliveryDate: string;
  };
}

function TrackContent() {
  const searchParams = useSearchParams();
  const initialAwb = searchParams.get('awb') || '';

  const [inputVal, setInputVal] = useState(initialAwb);
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (identifier: string) => {
    if (!identifier.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient<TrackingData>(`/shipments/track/${encodeURIComponent(identifier.trim())}`);
      setData(res.data);
    } catch (err: any) {
      setError(
        err.message ||
          `Unable to find tracking records for '${identifier}'. Try sample demo AWBs below.`
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialAwb) {
      fetchTracking(initialAwb);
    }
  }, [initialAwb]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(inputVal);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <Badge variant="blue">Real-Time Tracking Engine</Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Track Your WareIQ Shipment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Enter your Air Waybill (AWB) number or Order ID to inspect live shipment milestones, carrier routing, and delivery ETA.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="p-4 sm:p-6 shadow-md border-slate-200">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter AWB or Order ID (e.g. WIQ-AWB-2026-1001 or WIQ-ORD-1001)"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
                  required
                />
              </div>
              <Button type="submit" size="lg" isLoading={loading} className="px-8">
                Track Package
              </Button>
            </form>

            {/* Demo test pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Test Samples:</span>
              <button
                type="button"
                onClick={() => {
                  setInputVal('WIQ-AWB-2026-1001');
                  fetchTracking('WIQ-AWB-2026-1001');
                }}
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-colors cursor-pointer"
              >
                WIQ-AWB-2026-1001 (In Transit)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputVal('WIQ-AWB-2026-1002');
                  fetchTracking('WIQ-AWB-2026-1002');
                }}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-colors cursor-pointer"
              >
                WIQ-AWB-2026-1002 (Delivered)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputVal('WIQ-AWB-2026-1003');
                  fetchTracking('WIQ-AWB-2026-1003');
                }}
                className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-colors cursor-pointer"
              >
                WIQ-AWB-2026-1003 (NDR Alert)
              </button>
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Tracking Result View */}
          {data && (
            <div className="space-y-6 animate-slide-up">
              {/* Status Header Banner */}
              <Card className="overflow-hidden border-slate-200">
                <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">Carrier AWB Tracking Number</div>
                    <div className="text-2xl font-black font-mono tracking-wide">
                      {data.shipment.awbNumber}
                    </div>
                    <div className="text-xs text-slate-400">
                      Order ID: <span className="font-mono text-white">{data.shipment.orderId}</span> • Carrier: <span className="font-semibold text-blue-400">{data.shipment.courier}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-1">
                    <Badge status={data.shipment.currentStatus} className="text-sm px-3 py-1">
                      {data.shipment.currentStatus}
                    </Badge>
                    <div className="text-xs text-slate-300 mt-1">
                      {data.shipment.currentStatus === 'Delivered' ? (
                        <span className="text-emerald-400 font-semibold">
                          Delivered on {formatDate(data.shipment.deliveredAt || data.shipment.estimatedDelivery)}
                        </span>
                      ) : (
                        <span>
                          Expected Delivery: <strong className="text-white">{formatDate(data.shipment.estimatedDelivery)}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* NDR Warning Callout if active */}
                {data.shipment.currentStatus === 'NDR' && (
                  <div className="bg-amber-500/15 border-b border-amber-500/30 p-4 px-6 flex items-start gap-3 text-xs text-amber-950">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-900">
                        Non-Delivery Report (NDR) Active
                      </div>
                      <p className="mt-0.5 text-amber-800">
                        Delivery attempt unsuccessful (Customer unavailable). Automated WareIQ WhatsApp re-attempt verification workflow has been dispatched.
                      </p>
                    </div>
                  </div>
                )}

                {/* Origin and Destination details */}
                <div className="p-6 bg-slate-50/70 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Origin Node
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        {data.shipment.origin}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Destination
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        {data.shipment.destination}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Shipment Journey & Checkpoints
                  </h3>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                    {data.shipment.events.map((event, idx) => {
                      const isLatest = idx === 0;
                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 z-10 ${
                              isLatest
                                ? event.status === 'NDR'
                                  ? 'bg-amber-500 ring-4 ring-amber-100'
                                  : event.status === 'Delivered'
                                  ? 'bg-emerald-600 ring-4 ring-emerald-100'
                                  : 'bg-blue-600 ring-4 ring-blue-100'
                                : 'bg-slate-300'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>

                          <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                              <span className="font-bold text-xs text-slate-900">
                                {event.status}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {formatDateTime(event.timestamp)}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600">{event.description}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {event.location}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Accompanying Order Info */}
              {data.order && (
                <Card className="p-6 border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    Consignment & Order Overview
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Recipient</span>
                      <strong className="text-slate-800">{data.order.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Channel</span>
                      <strong className="text-slate-800">{data.order.channel}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Order Value</span>
                      <strong className="text-slate-800">{formatINR(data.order.totalAmount)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Payment Mode</span>
                      <Badge variant="neutral">{data.order.paymentStatus}</Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Package Contents:
                    </div>
                    <div className="divide-y divide-slate-100">
                      {data.order.items.map((item, i) => (
                        <div key={i} className="py-2 flex justify-between text-xs text-slate-700">
                          <span>
                            {item.name} <span className="font-mono text-slate-400">({item.sku})</span>
                          </span>
                          <span className="font-semibold text-slate-900">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-xs text-slate-500 font-medium">Loading tracking portal...</div>
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}
