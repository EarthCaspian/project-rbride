import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userId: number | null;
}

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;