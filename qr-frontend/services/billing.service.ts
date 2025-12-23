import api from './api';

export const billingService = {
    createOrder: async (plan: 'pro' | 'business') => {
        const response = await api.post('/billing/create-order', { plan });
        return response.data;
    },

    verifyPayment: async (data: any) => {
        const response = await api.post('/billing/verify', data);
        return response.data;
    }
};
