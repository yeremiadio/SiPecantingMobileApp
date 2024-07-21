import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  id: number | null;
  fullName: string | null;
}

const initialState: Partial<AuthState> = {
  isLoggedIn: false,
  id: null,
  fullName: null,
};

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState: initialState,
  reducers: {
    signIn: (state, {payload}: {payload: Partial<AuthState>}) => {
      state.isLoggedIn = !state.isLoggedIn;
      state.id = payload.id;
      state.fullName = payload.fullName;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {signIn, logout} = authSlice.actions;
export default authSlice.reducer;
