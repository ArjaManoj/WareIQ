'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> New
          </span>
          <span className="text-slate-300">
            Pan-India Quick Commerce Dark Store Staging & Smart NDR AI Bot V3 are now active.
          </span>
        </div>
        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium shrink-0 group transition-colors"
        >
          Book a 1-on-1 Growth Consultation
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};
