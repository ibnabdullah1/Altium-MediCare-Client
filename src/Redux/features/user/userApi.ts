import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "user/create-user",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    myProfileData: builder.query({
      query: () => {
        return {
          url: "user/me",
          method: "GET",
        };
      },
      providesTags: ["user_profile"],
    }),
    profileUpdate: builder.mutation({
      query: (profileInfo) => {
        return {
          url: `user/update-profile`,
          method: "PUT",
          body: profileInfo,
        };
      },
      invalidatesTags: ["user_profile"],
    }),
    getFollowedShops: builder.query({
      query: () => {
        return {
          url: `user/customer/followed-shops`,
          method: "GET",
        };
      },
      providesTags: ["follow-shop"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useMyProfileDataQuery,
  useProfileUpdateMutation,
  useGetFollowedShopsQuery,
} = authApi;
