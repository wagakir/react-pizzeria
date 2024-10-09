import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortItem } from "../../components/Sort";

interface InitialState {
  searchValue: string;
  category: number;
  sortProperty: SortItem;
  sortDesc: boolean;
}
const initialState: InitialState = {
  searchValue: "",
  category: 0,
  sortProperty: { name: "цене", property: "price" },
  sortDesc: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortProperty: (state, action: PayloadAction<SortItem>) => {
      state.sortProperty = action.payload;
    },
    setSortDesc: (state) => {
      state.sortDesc = !state.sortDesc;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        category: number;
        sortProperty: SortItem | undefined;
        sortDesc: boolean;
      }>
    ) => {
      // state.searchValue = action.payload.searchValue;
      state.category = action.payload.category;
      if (action.payload.sortProperty) {
        state.sortProperty = action.payload.sortProperty;
      }
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
