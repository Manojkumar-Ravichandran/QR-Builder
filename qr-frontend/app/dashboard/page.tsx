'use client';

import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import RecentQRCodesTable from '@/components/ui/dashboard/RecentQRCodesTable'
import ScanPerformanceChart from '@/components/ui/dashboard/ScanPerformanceChart'
import StatsGrid from '@/components/ui/dashboard/StatsGrid'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  // const { codes } = useAppSelector((state) => state.qr);
  return (
    <div className="space-y-6">
      <DashboardHeader name={user?.name} />
      {/* <StatsGrid totalCodes={codes.length} /> */}
      <ScanPerformanceChart />
      {/* <RecentQRCodesTable codes={codes} /> */}
    </div>
  )
}

export default Dashboard