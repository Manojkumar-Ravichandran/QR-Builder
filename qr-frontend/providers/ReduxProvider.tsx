'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect, useState } from 'react';
import { restoreSession } from '@/store/slices/auth.slice';
import { useAppDispatch } from '@/store/hooks';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  id: string;
  exp: number;
  iat?: number;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token) {
      try {
        // Decode the JWT to check expiration
        const decoded = jwtDecode<JWTPayload>(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if token is expired
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn('Token expired, clearing session');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          // Token is valid, restore session
          let user = null;
          try {
            user = userStr ? JSON.parse(userStr) : null;
          } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            localStorage.removeItem('user');
          }

          if (user) {
            dispatch(restoreSession({ user, token }));
          } else {
            // User data is missing, clear token as well
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        // Invalid token format, clear it
        console.error('Invalid token, clearing session:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
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
