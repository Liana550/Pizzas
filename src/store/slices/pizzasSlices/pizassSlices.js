import { createSlice } from "@reduxjs/toolkit";
import { getPizza, getOnePizza } from "./pizzasSlicesApi";
const initialState = {
  dataPizza: [],
  onePizza: null,
  loading: "pending",
  onePizzaLoading: "panding",
  pageNumber: 1,
  pageCount: null,
  infoMessage: null,
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizza.pending, (state) => {
        state.loading = "loading";
        state.dataPizza = [];
      })
      .addCase(getPizza.fulfilled, (state, { payload }) => {
        state.loading = "fulfilled";
        if (payload?.pizzas) {
          state.dataPizza = payload.pizzas;
          state.pageCount = payload.pageCount;
          state.infoMessage = null;
        } else {
          if (payload !== undefined) {
            state.infoMessage = payload.message;
          } else {
            state.infoMessage = null;
          }
        }
      })
      .addCase(getPizza.rejected, (state) => {
        state.loading = "rejected";
        state.dataPizza = [];
      })
      .addCase(getOnePizza.pending, (state) => {
        state.onePizzaLoading = "loading";
      })
      .addCase(getOnePizza.fulfilled, (state, { payload }) => {
        state.onePizza = payload;
        state.onePizzaLoading = "fulfilled";
      })
      .addCase(getOnePizza.rejected, (state) => {
        state.onePizzaLoading = "rejected";
      });
  },
});
export const { setPageNumber } = pizzaSlice.actions;
export default pizzaSlice.reducer;
