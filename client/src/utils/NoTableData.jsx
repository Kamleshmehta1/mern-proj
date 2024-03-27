import { Stack, Typography } from '@mui/material';
import React from 'react';

function NoTableData() {
  return (
    <Stack
      height="90vh"
      direction="row"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <Typography variant="h1">NO DATA FOUND !</Typography>
    </Stack>
  );
}

export default NoTableData;
