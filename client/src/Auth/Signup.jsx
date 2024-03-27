import React, { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from '../FormComponents/FormProvider';
import { Stack, Typography } from '@mui/material';
import RHFTextField from '../FormComponents/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { UNAUTHORIZE_PATH } from '../routes/paths';
import { useSignUpMutation } from '../redux/actions/authAction';
import RHFButton from '../FormComponents/RHFButton';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import MuiContainer from '../HOC/MuiContainer';
import Input from '../FormComponents/Input';

function Signup() {
  const navigate = useNavigate();
  const { handleSignup } = useContext(AuthContext);

  const [, { isLoading }] = useSignUpMutation();

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Enter a valid email!')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Confirm password is required'),
      })
    ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImage: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const handleClick = () => {
    navigate(UNAUTHORIZE_PATH.SIGN_IN.path);
  };

  const handleSignUpFn = useCallback(
    async (data) => {
      const dataObject = new FormData();

      Object?.keys(data)?.forEach((ele) => {
        dataObject.append(ele, data[ele]);
      });

      const bool = await handleSignup(dataObject);
      if (bool) reset();
    },
    [handleSignup, reset]
  );

  return (
    <MuiContainer maxWidth="sm" sx={{ padding: '10px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Signup Form
      </Typography>
      <FormProvider onSubmit={handleSubmit(handleSignUpFn)} methods={methods}>
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="password" label="Password" />
          <RHFTextField name="confirmPassword" label="Confirm Password" />
          <Input name="profileImage" type="file" />
          <RHFButton
            type="submit"
            title="Signup"
            variant="contained"
            isLoading={isLoading}
            disabled={isLoading}
          />
          <RHFButton
            sx={{ textAlign: 'center' }}
            variant="text"
            onClick={handleClick}
            disabled={isLoading}
            title="Already had account Sign in"
          />
        </Stack>
      </FormProvider>
    </MuiContainer>
  );
}

export default memo(Signup);
