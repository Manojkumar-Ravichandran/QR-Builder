import api from './api';
import { QRCode } from '@/store/slices/qrcode.slice';

export const qrCodeService = {
  create: async (data: Partial<QRCode>) => {
    const response = await api.post('/qrcodes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<QRCode>) => {
    const response = await api.patch(`/qrcodes/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/qrcodes/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/qrcodes');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/qrcodes/${id}`);
    return response.data;
  },
};
