import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isActive: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isActive = !state.isActive;
    },
    setSidebar: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
