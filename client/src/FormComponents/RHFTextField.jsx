import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    top: '-2px',
  },
  '& .MuiInputLabel-shrink': {
    top: '0px',
  },
});

function RHFTextField({ name, disabled, ...other }) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <StyledTextField
            {...field}
            fullWidth
            error={!!error && !disabled}
            helperText={error?.message}
            {...other}
          />
        );
      }}
    />
  );
}

export default RHFTextField;
