import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { RootState } from "../features/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "users",
    "shop",
    "product",
    "order",
    "product_id",
    "shop_id",
    "user_profile",
    "follow-shop",
    "transition",
    "shop-review",
  ],
  endpoints: () => ({}),
});
