'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Truck,
  Store,
  Zap,
  Building2,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      name: 'D2C Fulfillment & Warehousing',
      tagline: 'Same-day dispatch cutoffs till 4 PM with pan-India coverage',
      icon: Truck,
      color: 'blue',
      badge: 'Core Offering',
      capabilities: [
        'Multi-hub Smart Inventory Placement (SIP)',
        'Custom unboxing, gift tags, branded security polybags',
        'B2C returns processing and automated reverse QC',
        'Instant multi-channel inventory reconciliation',
      ],
      idealFor: 'Direct-to-consumer digital-first consumer brands',
    },
    {
      name: 'Marketplace Staging & Prep',
      tagline: 'Amazon Seller Flex, FBA Prep, Flipkart Assured & Myntra',
      icon: Store,
      color: 'amber',
      badge: 'Compliance',
      capabilities: [
        'Amazon Seller Flex prep & appointment scheduling',
        'Strict retailer barcoding, palletizing, and ASNs',
        'Unified inventory pool to prevent marketplace stockouts',
        'Zero vendor chargeback penalties guarantee',
      ],
      idealFor: 'Omnichannel brand merchants selling on 3+ marketplaces',
    },
    {
      name: 'Quick Commerce Dark Store Staging',
      tagline: 'Blinkit, Zepto, Swiggy Instamart & BB Now replenishment',
      icon: Zap,
      color: 'purple',
      badge: 'High Speed',
      capabilities: [
        'Under 2-hour dark store PO dispatch SLAs',
        'Strict batch & expiry date FEFO rotation compliance',
        'Dynamic urban micro-warehousing buffers',
        'Automated PO reconciliation and short-supply mitigation',
      ],
      idealFor: 'Snacking, beauty, beverages and impulse consumer goods',
    },
    {
      name: 'B2B Pallet & Modern Trade Distribution',
      tagline: 'Modern Trade distribution to Reliance, DMart & wholesale',
      icon: Building2,
      color: 'slate',
      badge: 'Enterprise',
      capabilities: [
        'Automated GST E-way bill generation and GRN tracking',
        'FTL and LTL linehaul scheduling across India',
        'Specialized heavy / bulk pallet handling infrastructure',
        'Customized payment terms and SLA governance',
      ],
      idealFor: 'Consumer durables, lifestyle brands, large suppliers',
    },
    {
      name: 'Smart Courier Allocation & Logistics',
      tagline: 'Aggregated national couriers with AI routing per pincode',
      icon: Navigation,
      color: 'indigo',
      badge: 'Multi-Carrier',
      capabilities: [
        'Smart Courier Allocation based on live pincode performance',
        'Automated NDR Management & WhatsApp buyer verification',
        'Up to 35% reduction in RTO losses',
        'Unified branded order tracking with real-time updates',
      ],
      idealFor: 'All eCommerce brands seeking lowest shipping transit times',
    },
    {
      name: 'Seller of Record (SOR) Multi-State Expansion',
      tagline: 'Instant 10+ state tax compliance with zero capex',
      icon: ShieldCheck,
      color: 'emerald',
      badge: 'Statutory',
      capabilities: [
        'Pre-registered GST entities in all major Indian consumer states',
        'Zero upfront investment in leases or physical branch setups',
        'Complete end-to-end statutory and tax filing compliance',
        'Unified centralized invoicing and ITC accounting',
      ],
      idealFor: 'Rapidly scaling brands aiming for national next-day coverage',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-blue-900/60 text-blue-300 border-blue-700">
              Service Catalog
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              End-to-End Fulfillment Capabilities
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Discover how WareIQ's full-stack fulfillment and supply chain services accelerate your brand's growth and customer delight.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Card key={i} hoverEffect className="flex flex-col justify-between">
                  <CardContent className="p-7 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="neutral">{svc.badge}</Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{svc.name}</h3>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">{svc.tagline}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Capabilities
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {svc.capabilities.map((cap, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                      <strong className="text-slate-900">Ideal For:</strong> {svc.idealFor}
                    </div>
                  </CardContent>

                  <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      Enquire for Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
