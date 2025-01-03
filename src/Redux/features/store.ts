import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "../api/baseApi";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import productReducer from "./product/productSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import wishlistReducer from "./wishlist/wishlistSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const wishPersistConfig = {
  key: "wishlist",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};
const recentViewProductPersistConfig = {
  key: "resentViewProduct",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishPersistConfig,
  wishlistReducer
);
const persistedResentViewProductReducer = persistReducer(
  recentViewProductPersistConfig,
  productReducer
);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishList: persistedWishlistReducer,
    sidebar: sidebarReducer,
    resentViewProduct: persistedResentViewProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
