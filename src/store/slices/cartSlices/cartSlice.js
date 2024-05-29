import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addCart,
  deleteCart,
  deletePizza,
  deleteOnePizza,
  changePizzaCount,
  bayCartArray,
} from "./cartSlicesApi";
const initialState = {
  cartArray: [],
  cartObj: null,
  changeObj: null,
  deletePizzaOneId: null,
  deletePizzaId: null,
  modal: false,
  bayCartLoading: "pending",
  cartLoading: "pending",
  cartObjLoading: "pending",
  deleteAllLoading: "pending",
  deletePizzaLoading: "pending",
  deleteOnePizzaLoading: "pending",
  changePizzaCountLoading: "pending",
  buyCartMessages: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setdeletePizzaOneId: (state, { payload }) => {
      state.deletePizzaOneId = payload;
    },
    setdeletePizzaId: (state, { payload }) => {
      state.deletePizzaId = payload;
    },
    setModal: (state, { payload }) => {
      state.modal = payload;
    },
    setResetBuyCartMessages: (state, { payload }) => {
      state.buyCartMessages = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.cartLoading = "loading";
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        if (Array.isArray(payload)) {
          state.cartArray = payload;
        } else {
          state.cartArray = [];
        }
        state.cartLoading = "fulfilled";
      })
      .addCase(getCart.rejected, (state) => {
        state.cartArray = [];
        state.cartLoading = "rejected";
      })
      .addCase(addCart.pending, (state) => {
        state.cartObjLoading = "loading";
      })
      .addCase(addCart.fulfilled, (state, { payload }) => {
        state.cartObj = payload;
        state.cartObjLoading = "fulfilled";
      })
      .addCase(addCart.rejected, (state) => {
        state.cartObj = null;
        state.cartObjLoading = "rejected";
      })
      .addCase(deleteCart.pending, (state) => {
        state.deleteAllLoading = "loading";
      })
      .addCase(deleteCart.fulfilled, (state, { payload }) => {
        state.deleteAllLoading = "fulfilled";
        state.cartArray = [];
      })
      .addCase(deleteCart.rejected, (state) => {
        state.deleteAllLoading = "rejected";
      })
      .addCase(deletePizza.pending, (state) => {
        state.deletePizzaLoading = "loading";
      })
      .addCase(deletePizza.fulfilled, (state, { payload }) => {
        state.deletePizzaLoading = "fulfilled";
        if (payload.message.includes("удалена")) {
          state.cartArray = state.cartArray.filter(
            (el) => el.pizzaId._id !== state.deletePizzaId
          );
        }
      })
      .addCase(deletePizza.rejected, (state) => {
        state.deletePizzaLoading = "rejected";
      })
      .addCase(deleteOnePizza.pending, (state) => {
        state.deleteOnePizzaLoading = "loading";
      })
      .addCase(deleteOnePizza.fulfilled, (state, { payload }) => {
        state.deleteOnePizzaLoading = "fulfilled";
        if (payload.message === "Элемент был удален") {
          state.cartArray.map(
            (el) =>
              (el.subCategories = el.subCategories.filter(
                (el) => el._id !== state.deletePizzaOneId
              ))
          );
        }
      })
      .addCase(deleteOnePizza.rejected, (state) => {
        state.deleteOnePizzaLoading = "rejected";
      })
      .addCase(changePizzaCount.pending, (state) => {
        state.changePizzaCountLoading = "loading";
      })
      .addCase(changePizzaCount.fulfilled, (state, { payload }) => {
        state.changePizzaCountLoading = "fulfilled";
        state.changeObj = payload;

        state.cartArray.map((el) =>
          el.subCategories.map(
            (elem) =>
              (elem.count =
                elem._id === state.changeObj.itemId
                  ? state.changeObj.count
                  : elem.count)
          )
        );
      })
      .addCase(changePizzaCount.rejected, (state) => {
        state.changePizzaCountLoading = "rejected";
      })
      .addCase(bayCartArray.pending, (state) => {
        state.bayCartLoading = "loading";
      })
      .addCase(bayCartArray.fulfilled, (state, { payload }) => {
        state.bayCartLoading = "fulfilled";
        console.log(payload);
        if (payload.message === "Ваша покупка удалась") {
          // state.modal = true;
          state.cartArray = [];
        }
        state.buyCartMessages = payload.message;
      })
      .addCase(bayCartArray.rejected, (state) => {
        state.bayCartLoading = "rejected";
      });
  },
});
export const {
  setdeletePizzaOneId,
  setdeletePizzaId,
  setModal,
  setResetBuyCartMessages,
} = cartSlice.actions;
export default cartSlice.reducer;
