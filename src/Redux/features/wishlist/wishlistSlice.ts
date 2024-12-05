import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: any[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },

    removeWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { addWishlist, removeWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
