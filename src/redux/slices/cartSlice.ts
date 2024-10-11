import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getItemsFromLS } from "../../utils/getItemsFromLS";
export type CartItemType = {
  count: number;
  price: number;
  title: string;
  imageUrl: string;
  type: string;
  size: number;
  id: number;
};
interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
const { items, totalPrice } = getItemsFromLS();
const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      //   state.items.push(action.payload);
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    incrementItem: (state, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count--;
      }
      if (findItem && findItem.count <= 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<CartItemType>) => {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, incrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
