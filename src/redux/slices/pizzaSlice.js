import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const {
      sortProperty,
      sortDesc,
      searchValue,
      category,
      itemsPerPage,
      itemOffset,
    } = params;
    const page = itemOffset / itemsPerPage + 1;
    const { data } = await axios.get(
      `http://localhost:3020/pizza?_sort=${sortProperty.property}${
        sortDesc ? "&_order=desc" : ""
      }${searchValue ? "&q=" + searchValue : ""}${
        category > 0 ? "&category=" + category : ""
      }${"&_page=" + page + "&_limit=" + itemsPerPage}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      // Add user to the state array
      state.items = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
