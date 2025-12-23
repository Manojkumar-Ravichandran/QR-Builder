import api from './api';

export interface User {
    _id: string;
    name: string;
    email: string;
    subscription?: {
        plan: string;
        status: string;
    };
}

export const userService = {
    getMe: async () => {
        const response = await api.get<{ data: User }>('/users/me');
        return response.data;
    },

    updateMe: async (data: Partial<User>) => {
        const response = await api.patch<{ data: User }>('/users/update-me', data);
        return response.data;
    }
};
