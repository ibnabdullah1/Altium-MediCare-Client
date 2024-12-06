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
      invalidatesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (statusInfo) => {
        return {
          url: `order/update-status/${statusInfo.orderId}`,
          method: "PUT",
          body: statusInfo,
        };
      },
      invalidatesTags: ["order"],
    }),
    userOrder: builder.query({
      query: () => {
        return {
          url: "order",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getVendorAllOrders: builder.query({
      query: () => {
        return {
          url: "order/vendor",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUserOrderQuery,
  useGetVendorAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderAPi;
