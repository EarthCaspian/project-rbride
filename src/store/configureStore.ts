import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { rentalReducer } from "./rentalSlice";
import { loadingReducer } from "./loadingSlice";
import { loginReducer } from "./loginSlice";
import { customerReducer } from "./customerSlice";
import { invoiceReducer } from "./invoiceSlice";
import { bookingReducer, bookingSlice } from "./bookingSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  rental: rentalReducer,
  loading: loadingReducer,
  login: loginReducer,
  customer: customerReducer,
  invoice: invoiceReducer,
  booking: bookingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
