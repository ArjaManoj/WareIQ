'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                W
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Ware<span className="text-blue-500">IQ</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              WareIQ is India’s modern eCommerce fulfillment tech platform enabling next-day delivery across India via a pan-India network of smart fulfillment centers, automated courier allocation, and machine-learning inventory distribution.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>HQ: Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@wareiq.com / business@wareiq.com</span>
              </div>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/solutions#d2c" className="hover:text-white transition-colors">
                  D2C Fulfillment
                </Link>
              </li>
              <li>
                <Link href="/solutions#marketplace" className="hover:text-white transition-colors">
                  Marketplace Prep & Flex
                </Link>
              </li>
              <li>
                <Link href="/solutions#quick-commerce" className="hover:text-white transition-colors">
                  Quick Commerce Dark Stores
                </Link>
              </li>
              <li>
                <Link href="/solutions#b2b" className="hover:text-white transition-colors">
                  B2B & Modern Trade Logistics
                </Link>
              </li>
              <li>
                <Link href="/solutions#sor" className="hover:text-white transition-colors">
                  Seller of Record (SOR)
                </Link>
              </li>
            </ul>
          </div>

          {/* Network & Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Fulfillment Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/network?zone=North" className="hover:text-white transition-colors">
                  Delhi NCR (Gurugram)
                </Link>
              </li>
              <li>
                <Link href="/network?zone=West" className="hover:text-white transition-colors">
                  Mumbai (Bhiwandi)
                </Link>
              </li>
              <li>
                <Link href="/network?zone=South" className="hover:text-white transition-colors">
                  Bengaluru (Hosakote)
                </Link>
              </li>
              <li>
                <Link href="/network?zone=South" className="hover:text-white transition-colors">
                  Hyderabad (Medchal)
                </Link>
              </li>
              <li>
                <Link href="/network?zone=East" className="hover:text-white transition-colors">
                  Kolkata (Dankuni)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Access & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/track" className="hover:text-white transition-colors text-blue-400 font-semibold">
                  Track Live Shipment
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Merchant Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Request Enterprise Demo
                </Link>
              </li>
              <li>
                <a
                  href="https://wareiq.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-500"
                >
                  Official WareIQ Site <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic & Client Project Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} WareIQ Interactive Platform — Developed by Manoj Arja (Full Stack MERN / Next.js).
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              Academic Demonstration built with factual public WareIQ information & clearly labeled sample operational data.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
