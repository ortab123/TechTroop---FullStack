import { initialState } from "../lib/cartState.js";

export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const newItem = { ...action.data, id: Date.now() };
      return {
        items: [...state.items, newItem],
        total: state.total + action.data.price,
        itemCount: state.itemCount + 1,
      };

    case "REMOVE_ITEM":
      const itemToRemove = state.items.find((item) => item.id === action.data);
      if (!itemToRemove) return state;
      return {
        items: state.items.filter((item) => item.id !== action.data),
        total: state.total - itemToRemove.price,
        itemCount: state.itemCount - 1,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}
