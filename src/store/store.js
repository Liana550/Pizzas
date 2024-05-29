import { configureStore } from "@reduxjs/toolkit";
import pizassSlices from "./slices/pizzasSlices/pizassSlices";
import filterSlice from "./slices/filterSlices/filterSlice";
import cartSlice from "./slices/cartSlices/cartSlice";
export const store = configureStore({
  reducer: {
    pizza: pizassSlices,
    filter: filterSlice,
    cart: cartSlice,
  },
});
