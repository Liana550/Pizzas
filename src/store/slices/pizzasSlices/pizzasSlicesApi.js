import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../Api";
export const getPizza = createAsyncThunk(
  "pizzaSlice/dataPizza",
  async (body) => {
    const count = `page=${body.pageNumber}`;
    const search = body.search ? `&search=${body.search}` : "";
    const filter = body.typeStyle ? `&filter=${body.typeStyle}` : "";
    const sort =
      body.sortStyle.type === "Все"
        ? ""
        : `&sort=${
            body.sortStyle.type === "популярности (DESC)" ||
            body.sortStyle.type === "популярности (ASC)"
              ? "rating"
              : body.sortStyle.type === "по цене (DESC)" ||
                body.sortStyle.type === "по цене (ASC)"
              ? "price"
              : "alp"
          }`;
    const order =
      body.sortStyle.sortProperty === null
        ? ""
        : `&order=${
            body.sortStyle.sortProperty === "rating" ||
            body.sortStyle.sortProperty === "price" ||
            body.sortStyle.sortProperty === "Titel"
              ? "desc"
              : "asc"
          }`;
    try {
      const { data } = await instance(
        `/api/pizzas?${count}&size=4${search}${filter}${sort}${order}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOnePizza = createAsyncThunk(
  "pizzaSlice/onePizza",
  async (id) => {
    try {
      const config = {
        method: "GET",
        url: `/api/pizzas/${id}`,
      };
      const { data } = await instance(config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
