'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/common/inputs/InputField';

import { login, register } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      router.push('/dashboard');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const action = isLogin
      ? login({ email, password })
      : register({ name, email, password });

    await dispatch(action);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="text-white w-7 h-7" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>

          <p className="text-slate-500 mt-2">
            {isLogin
              ? 'Enter your details to access your dashboard'
              : 'Start creating smart QR codes for free'}
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-xl border-0">
          <form onSubmit={handleSubmit} className="space-y-6">

            {!isLogin && (
              <InputField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading
                ? 'Please wait...'
                : isLogin
                  ? 'Sign in'
                  : 'Create account'}
            </Button>
          </form>

          {/* OAuth (future) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">Google</Button>
              <Button variant="outline" type="button">GitHub</Button>
            </div>
          </div>
        </Card>

        {/* Toggle */}
        <p className="text-center mt-6 text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
