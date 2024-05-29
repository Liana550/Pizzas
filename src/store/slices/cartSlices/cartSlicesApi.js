import instance from "../../../Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getCart = createAsyncThunk("cartSlice/cartArray", async () => {
  try {
    const { data } = await instance("/api/cart");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addCart = createAsyncThunk("cartSlice/cartObj", async (arg) => {
  try {
    const config = {
      method: "POST",
      data: arg,
      url: `/api/cart/add`,
    };
    const { data } = await instance(config);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteCart = createAsyncThunk("cartSlice/cartArr", async () => {
  try {
    const config = {
      method: "DELETE",
      url: "/api/cart/deleteAll",
    };
    const { data } = await instance(config);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePizza = createAsyncThunk(
  "cartSlice/cartObj1",
  async (arg) => {
    try {
      const config = {
        method: "DELETE",
        data: { pizzaId: arg },
        url: `/api/cart/deletePizza`,
      };
      const { data } = await instance(config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteOnePizza = createAsyncThunk(
  "cartSlice/cartObj2",
  async (arg) => {
    try {
      const config = {
        method: "DELETE",
        data: arg,
        url: `/api/cart/deleteOne`,
      };
      const { data } = await instance(config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const changePizzaCount = createAsyncThunk(
  "cart/cartObj3",
  async (obj) => {
    try {
      const config = {
        method: "PUT",
        url: `/api/cart/changeCount`,
        data: obj,
      };
      const { data } = await instance(config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bayCartArray = createAsyncThunk(
  "cartSlice/cartAr",
  async (obj) => {
    try {
      const config = {
        method: "POST",
        data: obj,
        url: "/api/cart/checkout",
      };
      const { data } = await instance(config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
