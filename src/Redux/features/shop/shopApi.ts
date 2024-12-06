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
      invalidatesTags: ["shop", "user_profile"],
    }),
    getAllShop: builder.query({
      query: () => {
        return {
          url: "shop",
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    getSingleShop: builder.query({
      query: (id) => {
        return {
          url: `shop/profile/${id}`,
          method: "GET",
        };
      },
      providesTags: ["shop_id"],
    }),
    followShop: builder.mutation({
      query: (id) => {
        return {
          url: `shop/${id}/follow`,
          method: "PUT",
        };
      },
      invalidatesTags: ["shop_id", "shop", "follow-shop"],
    }),
    updateShop: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `shop/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["shop_id", "shop"],
    }),
    deleteShop: builder.mutation({
      query: (id) => {
        return {
          url: `shop/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shop_id", "shop"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetAllShopQuery,
  useGetSingleShopQuery,
  useFollowShopMutation,
  useDeleteShopMutation,
  useUpdateShopMutation,
} = shopApi;
