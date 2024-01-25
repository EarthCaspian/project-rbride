import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { cartReducer} from "./cartSlice";
import { rentalReducer } from "./rentalSlice";


const rootReducer = combineReducers({
  cart: cartReducer,
  rental: rentalReducer,
});

const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
}

export default store;
export type RootState = ReturnType<typeof rootReducer>