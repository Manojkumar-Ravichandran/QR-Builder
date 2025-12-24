'use client';

import DashboardHeader from '@/components/ui/dashboard/DashboardHeader'
import RecentQRCodesTable from '@/components/ui/dashboard/RecentQRCodesTable'
import ScanPerformanceChart from '@/components/ui/dashboard/ScanPerformanceChart'
import StatsGrid from '@/components/ui/dashboard/StatsGrid'
import { useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'
import { analyticsService } from '@/services/analytics.service'

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { list } = useAppSelector((state) => state.qr);

  const [analyticsData, setAnalyticsData] = useState({
    totalScans: 0,
    activeQRs: 0,
    uniqueUsers: 0,
    trends: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await analyticsService.getDashboardStats();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader name={user?.name} />
      <StatsGrid
        totalCodes={list.length}
        totalScans={analyticsData.totalScans}
        activeDevices={analyticsData.uniqueUsers}
        loading={loading}
      />
      <ScanPerformanceChart data={analyticsData.trends} loading={loading} />
      <RecentQRCodesTable list={list} />
    </div>
  )
}

export default Dashboard