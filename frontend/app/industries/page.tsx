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
  Sparkles,
  ShoppingBag,
  Cpu,
  HeartPulse,
  Home,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Beauty, Cosmetics & Personal Care',
      icon: Sparkles,
      color: 'pink',
      description:
        'Batch number and expiry date tracking, temperature-monitored warehouse zones, strict FEFO inventory rotation, and premium customized unboxing with security seals.',
      metrics: '99.8% Batch Accuracy',
      features: ['Expiry / FEFO rotation', 'Temperature control', 'Fragile glass handling'],
    },
    {
      title: 'Fashion, Lifestyle & Apparel',
      icon: ShoppingBag,
      color: 'blue',
      description:
        'High-density garment storage for multi-size and color variants, barcode scan verification to avoid wrong dispatches, and 48-hour reverse QC processing for returns.',
      metrics: '48h Reverse QC Turnaround',
      features: ['Variant matrix mapping', 'Rapid reverse QC', 'Hanger & flat-pack staging'],
    },
    {
      title: 'Consumer Electronics & Accessories',
      icon: Cpu,
      color: 'indigo',
      description:
        '100% serialized tracking from inbound to dispatch, high-security CCTV storage cages, tamper-evident security tape, and transit insurance coordination.',
      metrics: '100% Serialized Capture',
      features: ['IMEI / Serial tracking', 'Secure staging cages', 'Fragile transit shield'],
    },
    {
      title: 'Health, Wellness & Nutraceuticals',
      icon: HeartPulse,
      color: 'emerald',
      description:
        'FSSAI-compliant certified hygienic fulfillment, air-conditioned storage for protein supplements and vitamins, and automated batch recall management.',
      metrics: 'Zero-Expired Dispatch Guarantee',
      features: ['FSSAI compliant zones', 'Hygienic dust-free storage', 'Strict FIFO/FEFO'],
    },
    {
      title: 'Home Furnishing & Kitchenware',
      icon: Home,
      color: 'amber',
      description:
        'Specialized handling for heavy, bulky, and fragile kitchenware. Multi-layer bubble wrap packaging, wooden crate reinforcement, and multi-box order staging.',
      metrics: '< 0.5% Transit Damage Rate',
      features: ['Bulky & heavy handling', 'Custom bubble packing', 'Multi-box consignment'],
    },
    {
      title: 'Sports, Fitness & Luggage',
      icon: Dumbbell,
      color: 'purple',
      description:
        'Volumetric weight optimization to reduce courier deadweight charges, sturdy box packaging for fitness gear, and fast turnaround for seasonal gym equipment spikes.',
      metrics: 'Up to 25% Volumetric Savings',
      features: ['Volumetric optimization', 'Heavy cargo staging', 'Seasonal surge handling'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-blue-900/50 text-blue-300 border-blue-700">
              Industry Verticals
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Tailored Fulfillment for Diverse Product Categories
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Discover industry-specific warehousing, compliance, batch tracking, and customized unboxing engineered for your vertical.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <Card key={i} hoverEffect className="flex flex-col justify-between">
                  <CardContent className="p-7 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{ind.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {ind.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-white p-3 rounded-xl text-xs flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Benchmark:</span>
                      <strong className="text-blue-400 font-bold">{ind.metrics}</strong>
                    </div>
                  </CardContent>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      Consult for Category <ArrowRight className="w-3.5 h-3.5" />
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
