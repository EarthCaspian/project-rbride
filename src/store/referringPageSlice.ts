import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface referringPageState {
  referringPage: string;
}

const initialState: referringPageState = {
  referringPage: "/",
};

const referringPageSlice = createSlice({
  name: 'referringPage',
  initialState: initialState,
  reducers: {
    setReferringPage: (state, action : PayloadAction<string>) => {
      state.referringPage = action.payload;
    },
  },
});

export const { setReferringPage } = referringPageSlice.actions;

export const referringPageReducer = referringPageSlice.reducer;

export const selectReferringPage = (state: {referringPage : referringPageState}) => state.referringPage.referringPage;