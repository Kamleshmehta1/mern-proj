import { Container } from '@mui/material';
import React from 'react';

function MuiContainer({ children, ...others }) {
  return <Container {...others}>{children}</Container>;
}

export default MuiContainer;
