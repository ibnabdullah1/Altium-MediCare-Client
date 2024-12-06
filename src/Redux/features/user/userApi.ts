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
    getAllUser: builder.query({
      query: () => {
        return {
          url: `user`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: (user) => {
        return {
          url: `user/update-role/${user.userId}`,
          method: "PUT",
          body: { role: user.role },
        };
      },
      invalidatesTags: ["users"],
    }),
    toggleUserStatus: builder.mutation({
      query: (user) => {
        return {
          url: `user/update-status/${user.userId}`,
          method: "PUT",
          body: { isSuspended: user.isSuspended },
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useMyProfileDataQuery,
  useProfileUpdateMutation,
  useGetFollowedShopsQuery,
  useUpdateUserRoleMutation,
  useGetAllUserQuery,
  useToggleUserStatusMutation,
} = authApi;
