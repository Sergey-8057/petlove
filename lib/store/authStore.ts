import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isAuthChecked: boolean; // 👈 новое
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setAuthChecked: () => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  user: null,
  isAuthChecked: false,

  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },

  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },

  setAuthChecked: () => {
    set(() => ({ isAuthChecked: true }));
  },
}));
