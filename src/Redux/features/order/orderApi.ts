import { baseApi } from "../../api/baseApi";

const orderAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => {
        return {
          url: "order/create",
          method: "POST",
          body: orderInfo,
        };
      },
    }),
    userOrder: builder.query({
      query: () => {
        return {
          url: "order",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useUserOrderQuery } = orderAPi;
