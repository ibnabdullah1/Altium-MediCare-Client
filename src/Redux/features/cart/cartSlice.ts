import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
  id: string;
  name: string;
  shopId: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stockQuantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        // Calculate total quantity of the item in the cart
        const totalQuantity = state.items.reduce(
          (acc, curr) =>
            curr.id === action.payload.id ? acc + curr.quantity : acc,
          0
        );
        // Check if adding the new quantity exceeds stock
        if (
          totalQuantity + action.payload.quantity >
          action.payload.stockQuantity
        ) {
          toast.error("Cannot exceed available stock.");
        } else {
          toast.success("Quantity updated successfully");
          item.quantity += action.payload.quantity;
        }
      } else {
        // Check if the quantity exceeds stock when adding a new item
        if (action.payload.quantity > action.payload.stockQuantity) {
          toast.error("Cannot exceed available stock.");
        } else {
          toast.success(`Added to cart for ${action.payload.name}`);
          state.items.push(action.payload);
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        stockQuantity: number;
      }>
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        // Check if the updated quantity exceeds stock
        if (action.payload.quantity > action.payload.stockQuantity) {
          toast.error("Cannot exceed available stock.");
        } else {
          toast.success("Quantity updated successfully");
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
