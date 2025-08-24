import { initialState } from "../lib/cartState.js";
import cartReducer from "./cartReducer.jsx";
import { useReducer } from "react";

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", data: product });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", data: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div>
      <h2>
        Shopping Cart ({state.itemCount} items) - Total: ${state.total}
      </h2>
      <button onClick={() => addItem({ name: "Laptop", price: 999 })}>
        Add Laptop
      </button>

      <button onClick={() => addItem({ name: "Phone", price: 499 })}>
        Add Phone
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
