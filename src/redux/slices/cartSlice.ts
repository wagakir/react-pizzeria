import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CartItemType = {
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
const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      //   state.items.push(action.payload);
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    incrementItem: (state, action: PayloadAction<{ id: number }>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      if (findItem && findItem.count <= 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
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
