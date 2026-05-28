import { create } from 'zustand';
import { useUserStore } from './user';
import { useUserViewStore } from './user-view';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  userName: string;
  userEmail: string;
  role: 'user' | 'admin' | null;
  setAuthenticated: (
    value: boolean,
    user?: { id: number; name: string; email: string; role: 'user' | 'admin' } | null
  ) => void;
  logout: () => void;
}

const emptyAuth = {
  isAuthenticated: false,
  userId: null,
  userName: '',
  userEmail: '',
  role: null,
} as const;

export const useAuthStore = create<AuthState>()((set) => ({
  ...emptyAuth,
  setAuthenticated: (value, user = null) =>
    set({
      isAuthenticated: value,
      userId: user?.id ?? null,
      userName: user?.name ?? '',
      userEmail: user?.email ?? '',
      role: user?.role ?? null,
    }),
  logout: () => {
    try {
      useUserStore.getState().reset();
    } catch {
      /* ignore */
    }
    try {
      useUserViewStore.getState().setView('home');
    } catch {
      /* ignore */
    }
    set({ ...emptyAuth });
  },
}));

// Por si quedó algo de una sesión anterior con persist, limpiarlo
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('auth-storage');
  } catch {
    /* ignore */
  }
}
