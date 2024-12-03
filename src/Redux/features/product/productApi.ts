import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "product/create-product",
          method: "POST",
          body: productInfo,
        };
      },
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
