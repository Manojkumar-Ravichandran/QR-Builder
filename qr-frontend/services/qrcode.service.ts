import api from './api';
import { QRCode } from '@/store/slices/qrcode.slice';

export const qrCodeService = {
  create: (data: Partial<QRCode>) =>
    api.post('/qrcodes', data),

  update: (id: string, data: Partial<QRCode>) =>
    api.put(`/qrcodes/${id}`, data),

  delete: (id: string) =>
    api.delete(`/qrcodes/${id}`),

  getAll: () =>
    api.get('/qrcodes'),

  getById: (id: string) =>
    api.get(`/qrcodes/${id}`),
};
