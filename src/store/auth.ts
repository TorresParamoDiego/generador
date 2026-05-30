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
    // 1. ELIMINA EL TOKEN FÍSICO (Ajusta 'token' al nombre que uses)
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); // Por si lo guardaste aquí

    try {
      useUserStore.getState().reset();
    } catch (error) {
      console.error("Error reseteando useUserStore:", error);
    }

    try {
      useUserViewStore.getState().setView('home');
    } catch (error) {
      console.error("Error cambiando la vista:", error);
    }

    // 3. Limpia el estado de autenticación
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
