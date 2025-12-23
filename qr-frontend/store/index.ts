import { configureStore } from '@reduxjs/toolkit';
import authReducr from './slices/auth.slice';
import qrReducer from './slices/qrcode.slice';

export const store = configureStore({
  reducer: {
    auth: authReducr,
    qr: qrReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
