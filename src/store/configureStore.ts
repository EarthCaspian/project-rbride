import { configureStore} from "@reduxjs/toolkit";
import { cartReducer} from "./cartSlice";


const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
}

export default store;