import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState: initialState,
  reducers: {
    signIn: state => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {signIn, logout} = authSlice.actions;
export default authSlice.reducer;
