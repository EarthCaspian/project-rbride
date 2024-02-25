import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { rentalReducer } from "./rentalSlice";
import { loadingReducer } from "./loadingSlice";
import { loginReducer } from "./loginSlice";
import { filterReducer } from "./filterSlice";
import { userReducer } from "./userSlice";
import { customerReducer } from "./customerSlice";
import { invoiceReducer } from "./invoiceSlice";
import { bookingReducer } from "./bookingSlice";
import { referringPageReducer } from "./referringPageSlice";
import { stepsReducer } from "./stepsSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cart: cartReducer,
  rental: rentalReducer,
  loading: loadingReducer,
  login: loginReducer,
  user : userReducer,
  filter: filterReducer,
  customer: customerReducer,
  invoice: invoiceReducer,
  booking: bookingReducer,
  referringPage : referringPageReducer,
  steps: stepsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
