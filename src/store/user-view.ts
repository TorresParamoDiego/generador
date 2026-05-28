import { create } from 'zustand';

export type UserView = 'home' | 'conference' | 'venue' | 'account';

interface UserViewState {
  view: UserView;
  setView: (view: UserView) => void;
}

export const useUserViewStore = create<UserViewState>()((set) => ({
  view: 'home',
  setView: (view) => set({ view }),
}));
