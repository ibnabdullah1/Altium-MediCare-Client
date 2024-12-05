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
      invalidatesTags: ["product"],
    }),
    vendorAllProducts: builder.query({
      query: () => {
        return {
          url: "product/vendor-product",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    allProducts: builder.query({
      query: () => {
        return {
          url: "product",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProducts: builder.query({
      query: (id) => {
        return {
          url: `product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["product_id"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useVendorAllProductsQuery,
  useAllProductsQuery,
  useGetSingleProductsQuery,
} = productApi;
