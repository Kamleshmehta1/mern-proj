import React from 'react';
import { SnackbarProvider } from 'notistack';

function NoTiStackProvider({ children }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default NoTiStackProvider;
