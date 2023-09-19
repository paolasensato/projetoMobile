import {create} from 'zustand';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
};

const useUserStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set(() => ({token})),
}));

export default useUserStore;
