import { api } from '../apiInterceptor';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      transformErrorResponse: (res) => {
        return res;
      },
    }),
    uploadProducts: build.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getAllProducts'],
    }),
  }),
});

export const { useUploadProductsMutation, useGetAllProductsQuery } =
  productsApi;
