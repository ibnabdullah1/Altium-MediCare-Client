import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TAuthState {
  user?: TUser | null | undefined;
  token?: string | null;
}

export type TUser = {
  name: string;
  profilePhoto: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setProfile: (state, action) => {
      if (state.user) {
        state.user.profilePhoto = action.payload;
      }
    },
  },
});

export const { setUser, logout, setProfile } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
