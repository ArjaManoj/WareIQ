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
  Navigation,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Zap,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Smartphone,
} from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-blue-900/50 text-blue-300 border-blue-700">
              WareIQ Smart Shipping Engine
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Intelligent Multi-Courier Shipping & Automated NDR Suite
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Power your brand with automated courier allocation across BlueDart, Delhivery, Xpressbees, DTDC, and Shadowfax. Reduce RTO losses by up to 35% with conversational WhatsApp verification.
            </p>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hoverEffect className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Smart Courier Allocation Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic ML engine analyzes live carrier performance per pincode and routes each package to the courier with the highest first-attempt delivery rate.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Live pincode SLA ranking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Weighted cost vs speed optimization
                </li>
              </ul>
            </Card>

            <Card hoverEffect className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Automated WhatsApp NDR Resolution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant conversational WhatsApp workflow triggers within minutes of an unsuccessful delivery attempt, capturing customer address corrections and rescheduled time slots.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Up to 35% reduction in RTO
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Direct courier rider re-attempt dispatch
                </li>
              </ul>
            </Card>

            <Card hoverEffect className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Branded Tracking & Engagement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transform package tracking into a branded post-purchase customer experience with your custom domain, banner campaigns, product cross-sells, and live SMS updates.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Custom tracking URL on your domain
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Repeat purchase recommendation engine
                </li>
              </ul>
            </Card>
          </div>

          {/* Integrated Courier Network */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Pre-Integrated National Courier Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {['BlueDart', 'Delhivery', 'Xpressbees', 'Shadowfax', 'DTDC', 'Ekart'].map((c, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl font-bold text-slate-800 text-xs sm:text-sm flex items-center justify-center shadow-2xs"
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link href="/contact">
                <Button className="gap-2">
                  Get Shipping Rates & Calculator <ArrowRight className="w-4 h-4" />
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
