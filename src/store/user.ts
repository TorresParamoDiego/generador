import { create } from 'zustand';

interface UserData {
  fullName: string;
  email: string;
  githubUser: string;
  url: string;
}

interface User extends UserData {
  setUser: (user: UserData) => void;
  reset: () => void;
}

const initial: UserData = {
  email: '',
  fullName: '',
  githubUser: '',
  url: '',
};

export const useUserStore = create<User>()((set) => ({
  ...initial,
  setUser: (user: UserData) =>
    set(() => ({
      email: user.email,
      fullName: user.fullName,
      githubUser: user.githubUser,
      url: user.url,
    })),
  reset: () => set(() => ({ ...initial })),
}));
