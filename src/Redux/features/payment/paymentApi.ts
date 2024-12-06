import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPayment: builder.mutation({
      query: (payload) => {
        return {
          url: "payment/payment-intent",
          method: "POST",
          body: payload,
        };
      },
    }),
    productTranslation: builder.query({
      query: () => {
        return {
          url: "payment/vendor/product-transition",
          method: "GET",
        };
      },
      providesTags: ["transition"],
    }),
  }),
});

export const { useAddPaymentMutation, useProductTranslationQuery } = paymentApi;
