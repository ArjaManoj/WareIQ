'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  Menu,
  X,
  Package,
  ChevronDown,
  Navigation,
  Layers,
  Building,
  Shield,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                W
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  Ware<span className="text-blue-600">IQ</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                  Fulfillment & Tech
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-slate-50">
                  Solutions
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {isSolutionsOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 grid gap-1 animate-slide-up z-50">
                    <Link
                      href="/solutions#d2c"
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                          D2C Fulfillment
                        </div>
                        <div className="text-xs text-slate-500">Same-Day & Next-Day pan-India</div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions#marketplace"
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                          Marketplace Fulfillment
                        </div>
                        <div className="text-xs text-slate-500">Amazon FBA, Flipkart, Myntra, Nykaa</div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions#quick-commerce"
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-purple-100 text-purple-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Navigation className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                          Quick Commerce Staging
                        </div>
                        <div className="text-xs text-slate-500">Blinkit, Zepto, Instamart Dark Stores</div>
                      </div>
                    </Link>

                    <Link
                      href="/solutions#sor"
                      className="p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                          Seller of Record (SOR)
                        </div>
                        <div className="text-xs text-slate-500">Multi-state tax compliance & zero capex</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/services"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrent('/services')
                    ? 'text-blue-600 bg-blue-50/60 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Services
              </Link>

              <Link
                href="/network"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrent('/network')
                    ? 'text-blue-600 bg-blue-50/60 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Fulfillment Network
              </Link>

              <Link
                href="/shipping"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrent('/shipping')
                    ? 'text-blue-600 bg-blue-50/60 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Shipping Engine
              </Link>

              <Link
                href="/industries"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrent('/industries')
                    ? 'text-blue-600 bg-blue-50/60 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Industries
              </Link>

              <Link
                href="/track"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isCurrent('/track')
                    ? 'text-blue-600 bg-blue-50/60'
                    : 'text-blue-700 hover:text-blue-800 bg-blue-50/40 hover:bg-blue-50'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                Track Order
              </Link>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="outline" size="sm" className="gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  {user.role === 'admin' ? 'Admin Control Tower' : 'Fulfillment Portal'}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/contact">
              <Button size="sm" className="shadow-md shadow-blue-600/20 gap-1.5">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/track">
              <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
                Track
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-xl">
          <Link
            href="/solutions"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Solutions Overview
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Services Catalog
          </Link>
          <Link
            href="/network"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Fulfillment Network Hubs
          </Link>
          <Link
            href="/shipping"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Smart Shipping Engine
          </Link>
          <Link
            href="/industries"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Industries We Power
          </Link>
          <Link
            href="/track"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg"
          >
            Track Shipment / AWB
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>
                <Button className="w-full">
                  {user.role === 'admin' ? 'Admin Console' : 'Go to Operations Dashboard'}
                </Button>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Merchant Login
                </Button>
              </Link>
            )}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Request Enterprise Demo</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
