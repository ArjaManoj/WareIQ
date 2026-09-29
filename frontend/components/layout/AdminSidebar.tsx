'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  ShieldAlert,
  Users,
  Inbox,
  PackagePlus,
  Boxes,
  Layers,
  LogOut,
  Menu,
  X,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import { DemoBanner } from './DemoBanner';

interface AdminLayoutProps {
  children: React.ReactNode;
  moduleName?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  moduleName = 'Admin Command Center',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Command Center', href: '/admin', icon: ShieldAlert },
    { name: 'Lead Pipeline (CRM)', href: '/admin/leads', icon: Inbox },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Orders & Simulators', href: '/admin/orders', icon: PackagePlus },
    { name: 'Inventory Control', href: '/dashboard/inventory', icon: Boxes },
    { name: 'Network Hubs CMS', href: '/dashboard/fulfillment-centers', icon: Layers },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-base shadow-sm">
              👑
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                Ware<span className="text-amber-400">IQ</span>
              </span>
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                Admin Control Tower
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Badge */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="text-xs font-semibold text-amber-300 truncate">
            {user?.name || 'WareIQ Master Admin'}
          </div>
          <div className="text-[11px] text-slate-400 truncate mt-0.5">
            Role: <span className="text-emerald-400 font-bold uppercase">{user?.role || 'admin'}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Internal Governance
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-blue-400 bg-blue-950/40 border border-blue-800/40 hover:bg-blue-900/50 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              Switch to Merchant Portal
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        <header className="h-18 bg-slate-950/80 border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {moduleName}
              </h1>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                WareIQ Internal Operations & CRM Administration
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <DemoBanner moduleName={moduleName} />
          {children}
        </main>
      </div>
    </div>
  );
};
