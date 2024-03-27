import { Box } from '@mui/material';
import React from 'react';

function LazyLoadStyles({ children }) {
  return (
    <Box
      sx={{
        flex: 1,
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export default LazyLoadStyles;
