'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect, useState } from 'react';
import { restoreSession } from '@/store/slices/auth.slice';
import { useAppDispatch } from '@/store/hooks';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token) {
      let user = null;
      try {
        user = userStr ? JSON.parse(userStr) : null;
      } catch (e) {
        console.error('Failed to parse user from localstorage', e);
      }
      dispatch(restoreSession({ user, token }));
    }
    setIsInitialized(true);
  }, [dispatch]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}
