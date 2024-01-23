import { configureStore} from "@reduxjs/toolkit";
import { cartReducer} from "./cartSlice";
import { rentalReducer } from "./rentalSlice";


const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      rental: rentalReducer,
    },
  });
}

export default store;