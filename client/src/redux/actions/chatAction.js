import { api } from '../apiInterceptor';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    userSearch: build.query({
      query: (filter) => ({
        url: '/search',
        method: 'GET',
        params: filter,
      }),
    }),
  }),
});

export const { useUserSearchQuery } = chatApi;
