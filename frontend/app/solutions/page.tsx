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
  ShieldCheck,
  Navigation,
  CheckCircle2,
  ArrowRight,
  Clock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'd2c',
      title: 'D2C Fulfillment',
      badge: 'High Velocity D2C',
      icon: Truck,
      color: 'blue',
      tagline: 'Amazon-grade Same-Day & Next-Day Delivery across India',
      description:
        'Store inventory closer to customers with our intelligent pan-India fulfillment center network. Achieve up to 40% reduction in shipping transit time and automated Shopify/eCommerce order routing.',
      metrics: [
        { label: 'Same-Day Dispatch Cutoff', value: '4:00 PM' },
        { label: 'SLA Dispatch Accuracy', value: '99.8%' },
        { label: 'Pincode Coverage', value: '27,000+' },
      ],
      capabilities: [
        'Multi-hub Smart Inventory Placement (SIP) for regional dispatch',
        'Custom unboxing experiences, promotional inserts & branded polybags',
        'Direct API sync with Shopify, WooCommerce, Magento & custom stores',
        'Automated weight discrepancy audit & carrier dispute shield',
      ],
    },
    {
      id: 'marketplace',
      title: 'Marketplace Fulfillment & Flex Prep',
      badge: 'Multi-Channel',
      icon: Store,
      color: 'amber',
      tagline: 'Full compliance for Amazon Seller Flex, Flipkart Assured & Myntra',
      description:
        'Ensure 100% SLA compliance and seamless inventory staging for major Indian marketplaces including Amazon FBA / Seller Flex, Flipkart, Myntra, and Nykaa.',
      metrics: [
        { label: 'Marketplace SLA Compliance', value: '99.9%' },
        { label: 'Appointment Booking', value: 'Automated' },
        { label: 'ASN Generation', value: 'Instant' },
      ],
      capabilities: [
        'Amazon Seller Flex prep & appointment scheduling',
        'Barcoding, carton labeling, and palletization as per retailer standards',
        'Cross-docking and unified inventory allocation across marketplaces',
        'Zero penalty rate on late dispatch or packaging non-compliance',
      ],
    },
    {
      id: 'quick-commerce',
      title: 'Quick Commerce Dark Store Staging',
      badge: 'Micro-SLAs',
      icon: Zap,
      color: 'purple',
      tagline: 'Hyperlocal replenishment for Blinkit, Zepto, and Instamart',
      description:
        'Fast-track inventory replenishment to Blinkit, Zepto, Swiggy Instamart, and BB Now dark stores with rigorous micro-SLAs and real-time visibility.',
      metrics: [
        { label: 'Dark Store Turnaround', value: '< 2 Hours' },
        { label: 'Batch Rejection Rate', value: '0.0%' },
        { label: 'Stockout Prevention', value: 'Active' },
      ],
      capabilities: [
        'Low-latency ASN generation and delivery dock scheduling',
        'Strict batch & expiry date compliance matching dark store criteria',
        'Micro-warehousing buffers near urban consumption pockets',
        'Daily automated PO reconciliation and short-supply mitigation',
      ],
    },
    {
      id: 'b2b',
      title: 'B2B & Modern Trade Logistics',
      badge: 'Enterprise Supply Chain',
      icon: Building2,
      color: 'slate',
      tagline: 'Bulk carton & pallet distribution to Modern Trade and General Trade',
      description:
        'Enterprise B2B logistics powering distribution to modern trade retail stores (Reliance, Shoppers Stop, DMart) and wholesale stockists with automated e-way bill generation.',
      metrics: [
        { label: 'E-way Bill Automation', value: '100%' },
        { label: 'Pallet / FTL Coordination', value: 'Pan-India' },
        { label: 'Retail Inwarding Pass Rate', value: '99.7%' },
      ],
      capabilities: [
        'Customized Advance Shipping Notice (ASN) & Goods Receipt Note (GRN) tracking',
        'Full Truckload (FTL) and Less-than-Truckload (LTL) linehaul coordination',
        'Compliance packaging and multi-tier carton sorting for supermarket chains',
        'Unified credit terms and customized enterprise SLA agreements',
      ],
    },
    {
      id: 'sor',
      title: 'Seller of Record (SOR)',
      badge: 'Multi-State Expansion',
      icon: ShieldCheck,
      color: 'emerald',
      tagline: 'Store stock in 10+ states across India with zero capex and instant compliance',
      description:
        'Store stock across multiple Indian states without the burden of setting up local branch offices or state-wise GST registrations.',
      metrics: [
        { label: 'States Accessible', value: '10+ States' },
        { label: 'Capital Expenditure', value: '₹0 Upfront' },
        { label: 'Tax Reconciliation', value: 'Automated' },
      ],
      capabilities: [
        'Instant access to WareIQ established GST registrations across regions',
        'Zero capital expenditure for commercial lease, security or licensing',
        'End-to-end statutory filing, GSTR reconciliation and input credit audit',
        'Unified centralized invoice clearing for multi-state dispatches',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Header Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-blue-900/60 text-blue-300 border-blue-700">
              WareIQ Solutions
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Modular Fulfillment Solutions for Every Retail Channel
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore how WareIQ's enterprise fulfillment infrastructure powers hyper-fast logistics across Direct-to-Consumer, Marketplaces, Dark Stores, and Modern Trade.
            </p>
          </div>
        </section>

        {/* Detailed Solutions List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {solutions.map((sol, index) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.id}
                  id={sol.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <Badge variant="neutral">{sol.badge}</Badge>
                          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                            {sol.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-blue-600">{sol.tagline}</p>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {sol.description}
                      </p>

                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Key Capabilities
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {sol.capabilities.map((cap, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Link href="/contact">
                          <Button size="sm" className="gap-2">
                            Request Custom Solution <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Right Metrics Panel */}
                    <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 space-y-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Operational Benchmarks
                      </div>
                      <div className="space-y-4">
                        {sol.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60"
                          >
                            <div className="text-xs text-slate-400">{metric.label}</div>
                            <div className="text-2xl font-black text-white mt-1">
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
