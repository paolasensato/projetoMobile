import {create} from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  resetToken: () => void;
};

const useUserStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set(() => ({token})),
  resetToken: () => set({token: null}),
}));

export default useUserStore;
