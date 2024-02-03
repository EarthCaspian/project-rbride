import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
    isLoggedIn: boolean;
  }
  
const initialState: LoginState = {
    isLoggedIn: false,
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      setLoggedIn: (state) => {
        state.isLoggedIn = true;
      },
      setLoggedOut: (state) => {
        state.isLoggedIn = false;
      },
    },
  });
  
  export const { setLoggedIn, setLoggedOut } = loginSlice.actions;
  export const selectIsLoggedIn = (state: { login: LoginState }) => state.login.isLoggedIn;
  export const loginReducer = loginSlice.reducer;