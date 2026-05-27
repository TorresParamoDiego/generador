import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  setAuthenticated: (value: boolean, userId?: number | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  userId: null,
  setAuthenticated: (value, userId = null) => set({ isAuthenticated: value, userId }),
}));