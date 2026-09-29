'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Truck,
  Zap,
  ShieldCheck,
  Building2,
  Navigation,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart2,
  Layers,
  MapPin,
  Clock,
  RotateCcw,
  Search,
  Users,
  Store,
} from 'lucide-react';

export default function HomePage() {
  const [quickTrackAwb, setQuickTrackAwb] = useState('');
  const router = useRouter();

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackAwb.trim()) {
      router.push(`/track?awb=${encodeURIComponent(quickTrackAwb.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Hero Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Next-Generation eCommerce Fulfillment Platform</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                  Amazon-grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">Same-Day Fulfillment</span> for Indian Brands.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Accelerate growth with WareIQ’s intelligent pan-India fulfillment network, ML-powered Smart Inventory Placement (SIP), and multi-courier aggregation with automated NDR reduction.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link href="/contact">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-600/25">
                      Request Enterprise Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/network">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Fulfillment Hubs
                    </Button>
                  </Link>
                </div>

                {/* Quick Tracking Input */}
                <div className="pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
                  <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    Quick Track Shipment or Order ID:
                  </p>
                  <form onSubmit={handleQuickTrack} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter AWB (e.g., WIQ-AWB-2026-1001)"
                        value={quickTrackAwb}
                        onChange={(e) => setQuickTrackAwb(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                      />
                    </div>
                    <Button type="submit" size="sm" variant="secondary" className="text-xs">
                      Track
                    </Button>
                  </form>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                    <span>Try sample AWB:</span>
                    <button
                      type="button"
                      onClick={() => router.push('/track?awb=WIQ-AWB-2026-1001')}
                      className="text-blue-600 hover:underline font-mono"
                    >
                      WIQ-AWB-2026-1001
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => router.push('/track?awb=WIQ-AWB-2026-1003')}
                      className="text-amber-600 hover:underline font-mono"
                    >
                      WIQ-AWB-2026-1003 (NDR)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-6">
                  {/* Floating badge */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Live Control Tower
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">SIP Engine v4.2</span>
                  </div>

                  {/* Simulated Metrics Card */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
                      <div className="text-[11px] text-slate-400">Same-Day Cutoff</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">4:00 PM</div>
                      <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Guaranteed Dispatch
                      </div>
                    </div>
                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
                      <div className="text-[11px] text-slate-400">RTO Reduction</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">Up to 35%</div>
                      <div className="text-[10px] text-blue-400 mt-1">Smart NDR AI Bot</div>
                    </div>
                  </div>

                  {/* Active Fulfillment Center Node */}
                  <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/80 p-4 rounded-2xl border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        Delhi NCR Hub → Jaipur Delivery
                      </span>
                      <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        In Transit
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Order Picked & Packed (11:20 AM)</span>
                      <span className="text-emerald-300 font-semibold">ETA: Tomorrow 2 PM</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Integrated with BlueDart, Delhivery, Shadowfax & Xpressbees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACTUAL BUSINESS METRICS */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-blue-400">99.8%</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">On-Time SLA Dispatch</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-white">4:00 PM</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Daily Same-Day Dispatch Cutoff</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">35%</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Average RTO Loss Reduction</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">10+ Hubs</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Pan-India Fulfillment Centers</div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE SOLUTIONS SECTION */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Fulfillment Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Complete Fulfillment Ecosystem Built for Modern Commerce
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Whether scaling your Shopify D2C store, supplying marketplace flex nodes, or replenishing quick commerce dark stores, WareIQ delivers Amazon-grade operational speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <Card hoverEffect className="border-t-4 border-t-blue-600 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">D2C Fulfillment</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nationwide distributed warehousing, automated pick-pack-ship, and same-day dispatch cutoffs till 4 PM with direct Shopify & WooCommerce sync.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Smart Inventory Placement (SIP)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Custom branded packaging & unboxing
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/solutions#d2c" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Explore D2C Capabilities <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Solution 2 */}
              <Card hoverEffect className="border-t-4 border-t-amber-500 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Marketplace Fulfillment</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ensure 100% compliance for Amazon Seller Flex & FBA prep, Flipkart Assured, Myntra, and Nykaa with automated appointment scheduling.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Amazon Seller Flex compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Palletization and barcode labeling
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/solutions#marketplace" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                    Marketplace Prep Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Solution 3 */}
              <Card hoverEffect className="border-t-4 border-t-purple-600 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Quick Commerce Staging</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Micro-fulfillment staging and replenishment for Blinkit, Zepto, Swiggy Instamart, and BB Now dark stores with rigorous micro-SLAs.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Under 2-hour dark store replenishment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Zero-rejection batch compliance
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/solutions#quick-commerce" className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                    Quick Commerce Staging <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Solution 4 */}
              <Card hoverEffect className="border-t-4 border-t-slate-800 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">B2B & Retail Distribution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bulk pallet and carton distribution to Modern Trade (Reliance, DMart, Shoppers Stop) and General Trade stockists with GST E-way bills.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Automated ASN & E-way bill creation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      FTL & LTL carrier coordination
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/solutions#b2b" className="text-xs font-bold text-slate-800 hover:text-slate-950 flex items-center gap-1">
                    B2B Logistics Overview <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Solution 5 */}
              <Card hoverEffect className="border-t-4 border-t-emerald-600 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Seller of Record (SOR)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scale nationwide without establishing individual state branch offices or local GST entities. Expand instantly across 10+ states with zero capex.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Multi-state GST registration access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Statutory tax filing & reconciliation
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/solutions#sor" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    SOR Compliance Framework <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>

              {/* Solution 6 */}
              <Card hoverEffect className="border-t-4 border-t-indigo-600 flex flex-col justify-between">
                <CardContent className="p-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Smart Shipping Engine</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Courier aggregation with ML-powered courier allocation engine across BlueDart, Delhivery, Xpressbees, DTDC, and Shadowfax.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Dynamic pincode SLA routing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Automated WhatsApp NDR resolution
                    </li>
                  </ul>
                </CardContent>
                <div className="p-5 bg-slate-50 border-t border-slate-100">
                  <Link href="/shipping" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                    Multi-carrier Engine <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW WAREIQ WORKS */}
        <section className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Operating Workflow
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                How WareIQ Powers Next-Day Fulfillment
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900">Smart Inventory Placement</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Historical demand modeling suggests optimum stock allocation across Delhi, Mumbai, Bangalore, and Kolkata hubs.
                </p>
              </div>

              <div className="space-y-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900">Automated Order Routing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Orders from Shopify, Amazon, or dark stores are captured in real-time and routed to the closest FC node.
                </p>
              </div>

              <div className="space-y-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900">Pick, Pack & Smart Dispatch</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated bin picking, customized security packaging, and handover to the fastest carrier by 4 PM.
                </p>
              </div>

              <div className="space-y-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900">NDR Resolution & Delivery</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Failed delivery attempts are resolved via automated WhatsApp verification, ensuring maximum delivery success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-950 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to cut shipping times by 40% and lower RTO?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Connect with a WareIQ enterprise fulfillment specialist to evaluate your brand's pan-India inventory placement plan.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg">
                  Request a Customized Proposal
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-blue-300 text-white hover:bg-blue-900/50">
                  Launch Interactive Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
