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
  }),
});

export const { useAddPaymentMutation } = paymentApi;
