import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  category: 0,
  sortProperty: { name: "цене", property: "price" },
  sortDesc: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortProperty: (state, action) => {
      state.sortProperty = action.payload;
    },
    setSortDesc: (state) => {
      state.sortDesc = !state.sortDesc;
    },
    setFilters: (state, action) => {
      console.log(action.payload);
      // state.searchValue = action.payload.searchValue;
      state.category = action.payload.category;
      state.sortProperty = action.payload.sortProperty;
      state.sortDesc = action.payload.sortDesc;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setCategory,
  setSortProperty,
  setSortDesc,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
