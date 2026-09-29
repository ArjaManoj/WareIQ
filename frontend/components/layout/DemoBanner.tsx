'use client';

import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface DemoBannerProps {
  moduleName?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ moduleName = 'Dashboard Operations' }) => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs mb-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="p-1 rounded-md bg-amber-500 text-white shrink-0">
          <Info className="w-3.5 h-3.5" />
        </span>
        <div className="font-medium text-slate-800">
          <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px] bg-amber-100 px-2 py-0.5 rounded mr-1.5 border border-amber-200">
            Demo Environment
          </span>
          All records ({moduleName}) are demonstration samples to illustrate live WareIQ operations.
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-white/80 px-2.5 py-1 rounded-md border border-amber-200 shadow-xs">
        <Sparkles className="w-3 h-3 text-amber-600" />
        Sample Data Active
      </div>
    </div>
  );
};
