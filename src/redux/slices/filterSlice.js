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
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue, setCategory, setSortProperty, setSortDesc } =
  filterSlice.actions;

export default filterSlice.reducer;
