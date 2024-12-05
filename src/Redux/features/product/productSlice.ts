import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResentViewProductState {
  items: any[];
}

const MAX_VIEW_ITEMS = 10;

const initialState: ResentViewProductState = {
  items: [],
};

const resentViewProductSlice = createSlice({
  name: "resentViewProduct",
  initialState,
  reducers: {
    addResentView: (state, action: PayloadAction<any>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (!exists) {
        if (state.items.length >= MAX_VIEW_ITEMS) {
          state.items.shift();
        }
        state.items.push(action.payload);
      }
    },
    clearResentViewProduct: (state) => {
      state.items = [];
    },
  },
});

export const { addResentView, clearResentViewProduct } =
  resentViewProductSlice.actions;

export default resentViewProductSlice.reducer;
