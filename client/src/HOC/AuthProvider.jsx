import React, { useMemo } from 'react';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
import typography from '../themes/typography';

function AuthProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      typography,
    }),
    []
  );
  const theme = createTheme(themeOptions);

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}

export default AuthProvider;
