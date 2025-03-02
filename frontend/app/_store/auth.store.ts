import { create } from "zustand";
import { AuthUserState } from "../_types/auth";

interface AuthStore {
  user?: AuthUserState;
  accessToken?: string;
  setAccessToken: (token: string | undefined) => void;
  setUser: (user: AuthUserState | undefined) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  accessToken: undefined,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  setUser: (user) => set(() => ({ user: user })),
}));

export default useAuthStore;
