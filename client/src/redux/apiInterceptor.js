import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { delete_cookie } from '../utils/handleCookie';
import { initialize } from '../redux/slice/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
});

async function refresh(args, api, extraOptions) {
  let refreshResult;
  try {
    refreshResult = await baseQuery(
      {
        url: '/reAuthenticate',
        method: 'GET',
      },
      api,
      extraOptions
    );
  } catch (error) {
    console.log('err', error);
  }

  if (refreshResult?.data?.status === 200) {
    try {
      return await baseQuery(args, api, extraOptions);
    } catch (err) {
      console.log('err', err);
    }
  } else {
    delete_cookie('accessToken');
    delete_cookie('refreshToken');
    api.dispatch(
      initialize({
        isAuthenticated: false,
      })
    );
  }
}

async function baseQueryFn(args, api, extraOptions) {
  let res = await baseQuery(args, api, extraOptions);
  if (
    [401]?.includes(res?.error?.status) &&
    res?.error?.data?.message?.includes('Token Expired')
  ) {
    res = await refresh(args, api, extraOptions);
  } else if (
    res?.error &&
    (res?.error?.originalStatus === 403 || res?.error?.status === 403)
  ) {
    delete_cookie('accessToken');
    delete_cookie('refreshToken');
    api.dispatch(
      initialize({
        isAuthenticated: false,
      })
    );
  }
  return res;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryFn,
  tagTypes: ['auth'],
  endpoints: () => ({}),
});
