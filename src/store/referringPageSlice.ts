import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface referringPageState {
  referringPage: string;
}

const initialState: referringPageState = {
  referringPage: JSON.parse(localStorage.getItem("referringPage") || JSON.stringify("/")),
};

const referringPageSlice = createSlice({
  name: 'referringPage',
  initialState: initialState,
  reducers: {
    setReferringPage: (state, action : PayloadAction<string>) => {
      state.referringPage = action.payload;
      localStorage.setItem("referringPage", JSON.stringify(state.referringPage));
    },
  },
});

export const { setReferringPage } = referringPageSlice.actions;

export const referringPageReducer = referringPageSlice.reducer;

export const selectReferringPage = (state: {referringPage : referringPageState}) => state.referringPage.referringPage;