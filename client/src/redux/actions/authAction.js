import { api } from '../apiInterceptor';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (res) => {
        return res;
      },
    }),
    signUp: build.mutation({
      query: (body) => {
        return {
          url: '/signup',
          method: 'POST',
          body,
        };
      },
      transformErrorResponse: (res) => {
        return res;
      },
    }),
    posts: build.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  usePostsQuery,
  useProfileQuery,
} = authApi;
