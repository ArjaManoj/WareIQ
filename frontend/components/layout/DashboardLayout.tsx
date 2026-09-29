'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Building2,
  BarChart3,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Bell,
  Search,
  ExternalLink,
} from 'lucide-react';
import { DemoBanner } from './DemoBanner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  moduleName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  moduleName = 'Overview',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders & Tracking', href: '/dashboard/orders', icon: Package },
    { name: 'Inventory & SKUs', href: '/dashboard/inventory', icon: Boxes },
    { name: 'Fulfillment Centers', href: '/dashboard/fulfillment-centers', icon: Building2 },
    { name: 'Analytics & SLAs', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              W
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                Ware<span className="text-blue-400">IQ</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                Fulfillment Portal
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

        {/* User / Merchant Quick Info */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/40">
          <div className="text-xs font-semibold text-white truncate">
            {user?.name || 'Manoj Arja (Demo Merchant)'}
          </div>
          <div className="text-[11px] text-blue-400 font-medium truncate mt-0.5">
            {user?.companyName || 'Acme D2C Brands'}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Role: {user?.role || 'customer'}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Operations Modules
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
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}

          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              <div className="px-3 pb-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Privilege
              </div>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-800/40 hover:bg-amber-900/50 transition-all"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Admin Command Center
              </Link>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>View Public Website</span>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-18 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {moduleName}
              </h1>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                WareIQ Smart Logistics & Automated 3PL Dashboard
              </div>
            </div>
          </div>

          {/* Quick Actions & Live Indicator */}
          <div className="flex items-center gap-3">
            <Link href="/track" className="hidden md:flex">
              <span className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60 transition-colors">
                Track AWB
              </span>
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
                {(user?.name || 'M').charAt(0)}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-slate-800">{user?.name || 'Manoj Arja'}</div>
                <div className="text-[10px] text-slate-500">{user?.role || 'customer'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <DemoBanner moduleName={moduleName} />
          {children}
        </main>
      </div>
    </div>
  );
};
