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
    }),
  }),
});

export const { useCreateUserMutation, useMyProfileDataQuery } = authApi;
