import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface BookingState {
  isBookedCompleted: boolean;
}

const initialBookingState: BookingState = {
  isBookedCompleted: false,
};

export const bookingSlice = createSlice({
  name: "bookingReducer",
  initialState: initialBookingState,

  reducers: {
    handleBookingCompletion(
      state: BookingState,
      action: PayloadAction<boolean>
    ) {
      state.isBookedCompleted = action.payload;
    },
  },
});

export const bookingReducer = bookingSlice.reducer;
export const isBooked = (state: RootState) => state.booking;
export const { handleBookingCompletion } = bookingSlice.actions;
