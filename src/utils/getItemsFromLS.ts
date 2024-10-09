import { calcTotalPrice } from "./calcTotalPrice";

export const getItemsFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data !== null ? JSON.parse(data) : [];

  if (items.length > 0) {
    return { items, totalPrice: calcTotalPrice(items) };
  } else return { items, totalPrice: 0 };
};
