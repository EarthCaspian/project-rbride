import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { cartReducer} from "./cartSlice";
import { rentalReducer } from "./rentalSlice";
import { loadingReducer } from "./loadingSlice";
import { loginReducer } from "./loginSlice";
import { filterReducer } from "./filterSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  rental: rentalReducer,
  loading: loadingReducer,
  login: loginReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>