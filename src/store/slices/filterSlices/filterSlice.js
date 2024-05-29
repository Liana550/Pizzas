import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sortStyle: { type: "Все", sortProperty: null },
  typeStyle: 0,
  search: "",
  notificationStatus: { open: null, status: null, messagesText: null },
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortStyle: (state, { payload }) => {
      state.sortStyle = payload;
    },
    setTypeStyle: (state, { payload }) => {
      state.typeStyle = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setNotificationStatus: (state, { payload }) => {
      state.notificationStatus = payload;
    },
  },
});
export const { setSortStyle, setTypeStyle, setSearch, setNotificationStatus } =
  filterSlice.actions;
export default filterSlice.reducer;
