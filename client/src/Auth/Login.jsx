import React, { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from '../FormComponents/FormProvider';
import { Stack, Typography } from '@mui/material';
import RHFTextField from '../FormComponents/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { AUTHORIZED_PATHS, UNAUTHORIZE_PATH } from '../routes/paths';
import { useSignInMutation } from '../redux/actions/authAction';
import RHFButton from '../FormComponents/RHFButton';
import useAuth from './useAuth';
import { enqueueSnackbar } from 'notistack';
import { initialize } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import MuiContainer from '../HOC/MuiContainer';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleLogin } = useAuth();

  const [{ isLoading }] = useSignInMutation();

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required'),
      })
    ),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit } = methods;

  const handleClick = () => {
    navigate(UNAUTHORIZE_PATH.SIGN_UP.path);
  };

  const handleLoginFn = useCallback(
    async (data) => {
      const bool = await handleLogin(data);

      if (bool) {
        dispatch(initialize({ isAuthenticated: true }));
        navigate(AUTHORIZED_PATHS.HOME.path);
        enqueueSnackbar('Login successfully!', { variant: 'success' });
      }
    },
    [dispatch, handleLogin, navigate]
  );

  return (
    <MuiContainer maxWidth="sm" sx={{ padding: '10px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Login Form
      </Typography>
      <FormProvider onSubmit={handleSubmit(handleLoginFn)} methods={methods}>
        <Stack spacing={2}>
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="password" label="Password" />
          <RHFButton
            variant="contained"
            type="submit"
            isLoading={isLoading}
            title="Login"
          />
          <RHFButton
            sx={{ textAlign: 'center' }}
            variant="text"
            onClick={handleClick}
            isLoading={isLoading}
            title="Create a new account"
          />
        </Stack>
      </FormProvider>
    </MuiContainer>
  );
}

export default memo(Login);
