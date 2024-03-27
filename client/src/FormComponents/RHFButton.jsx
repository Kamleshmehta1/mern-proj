import { Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';

function RHFButton({ isLoading, title, disabled, ...other }) {
  return (
    <Button disabled={disabled} {...other}>
      <Typography color="inherit">{title}</Typography>
      {isLoading ? (
        <CircularProgress sx={{ ml: 1 }} size={15} color="inherit" />
      ) : null}
    </Button>
  );
}

export default RHFButton;
