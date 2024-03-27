import { CircularProgress } from '@mui/material';
import React from 'react';
import LazyLoadStyles from '../styles/LazyLoadStyles';

function LoadingScreen() {
  return (
    <LazyLoadStyles>
      <CircularProgress sx={{ fontSize: '32px' }} color="primary" />
    </LazyLoadStyles>
  );
}

export default LoadingScreen;
