'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

type Props = {
  children: React.ReactNode;
  hasToken: boolean;
};

export default function AuthProvider({ children, hasToken }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: hasToken,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!hasToken) {
      clearAuth();
      return;
    }

    if (isLoading) return;

    if (user) {
      setUser(user);
    } else {
      clearAuth();
    }
  }, [user, isLoading, hasToken, setUser, clearAuth]);

  return <>{children}</>;
}
