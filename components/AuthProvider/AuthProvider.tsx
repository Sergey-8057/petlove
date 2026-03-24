// components/AuthProvider/AuthProvider.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

type Props = {
  children: React.ReactNode;
};

// Функция для проверки наличия токена
// const hasToken = (): boolean => {
//   if (typeof document === 'undefined') return false;
//   return document.cookie.split(';').some(cookie => cookie.trim().startsWith('accessToken='));
// };

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const setAuthChecked = useAuthStore(state => state.setAuthChecked);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: true,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      setUser(user);
    } else {
      clearIsAuthenticated();
    }

    setAuthChecked(); // 👈 важно
  }, [user, isLoading, setUser, clearIsAuthenticated, setAuthChecked]);

  return children;
}