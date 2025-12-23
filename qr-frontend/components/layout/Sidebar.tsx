'use client';

import React from 'react'
import BrandLogo from '../ui/BrandLogo'
import { useDispatch } from 'react-redux';
import { LayoutDashboard, QrCode, PlusCircle, BarChart2, Settings, CreditCard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/store/slices/auth.slice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'Create QR', path: '/dashboard/create' },
    { icon: QrCode, label: 'My QR Codes', path: '/dashboard/codes' },
    // { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    // { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    // { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  ];
  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <BrandLogo />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.path === '/dashboard'
            ? pathname === item.path
            : pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            document.cookie = 'token=; path=/; max-age=0';
            dispatch(logout());
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar