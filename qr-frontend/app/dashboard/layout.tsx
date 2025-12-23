'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { token, user } = useAppSelector((state) => state.auth);

  // 🔐 Auth Guard
  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  // Prevent UI flicker
  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {user?.subscription?.plan || 'Free'} Plan
              </p>
            </div>

            <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
