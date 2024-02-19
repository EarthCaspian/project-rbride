import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userId: number;
}

const initialState: UserState = {
  userId: JSON.parse(localStorage.getItem("userId") || "0"),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
  },
});

export const { setUser } = userSlice.actions;

export  const userReducer = userSlice.reducer;