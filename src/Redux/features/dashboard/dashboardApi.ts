import { baseApi } from "../../api/baseApi";

const dashboardAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerDashboardStats: builder.query({
      query: () => {
        return {
          url: "dashboard/customer-stats",
          method: "GET",
        };
      },
    }),
    getVendorDashboardStats: builder.query({
      query: () => {
        return {
          url: "dashboard/vendor-stats",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCustomerDashboardStatsQuery,
  useGetVendorDashboardStatsQuery,
} = dashboardAPi;
