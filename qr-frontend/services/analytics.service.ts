import api from './api';

export interface DashboardStats {
    totalScans: number;
    activeQRs: number;
    uniqueUsers: number;
    trends: { name: string; fullDate: string; scans: number }[];
}

export const analyticsService = {
    getDashboardStats: async () => {
        const response = await api.get<{ status: string; data: DashboardStats }>('/analytics/dashboard');
        return response.data.data;
    }
};
