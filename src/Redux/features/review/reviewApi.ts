import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "review/create",
          method: "POST",
          body: reviewInfo,
        };
      },
      invalidatesTags: ["product_id"],
    }),
    createShopReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "shop/review/create",
          method: "POST",
          body: reviewInfo,
        };
      },
      invalidatesTags: ["shop_id", "shop"],
    }),
  }),
});

export const { useCreateReviewMutation, useCreateShopReviewMutation } =
  reviewApi;
