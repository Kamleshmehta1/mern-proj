import React, { createContext, useCallback, useEffect } from 'react';
import {
  useSignInMutation,
  useSignUpMutation,
} from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '../redux/slice/authSlice';
import { getCookie } from '../utils/handleCookie';
import { enqueueSnackbar } from 'notistack';

const AuthContext = createContext({
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
});

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const authSliceData = useSelector((state) => state?.authContext);

  const handleLogin = useCallback(
    async (data) => {
      const res = await signIn(data);

      if (res?.data?.status === 200) {
        return true;
      }
      return false;
    },
    [signIn]
  );

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (accessToken || refreshToken) {
      dispatch(initialize({ isAuthenticated: true }));
    } else {
      dispatch(initialize({ isAuthenticated: false }));
    }
  }, [dispatch]);

  const handleSignup = useCallback(
    async (data) => {
      const res = await signUp(data);

      if (res?.data?.status === 200) {
        enqueueSnackbar('Sign up successfully!', { variant: 'success' });
        return true;
      }
      return false;
    },
    [signUp]
  );

  return (
    <AuthContext.Provider
      value={{ ...authSliceData, handleSignup, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
