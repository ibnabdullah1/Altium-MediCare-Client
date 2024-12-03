import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (shopInfo) => {
        return {
          url: "shop/create-shop",
          method: "POST",
          body: shopInfo,
        };
      },
    }),
    getAllShop: builder.query({
      query: () => {
        return {
          url: "shop",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateShopMutation, useGetAllShopQuery } = shopApi;
