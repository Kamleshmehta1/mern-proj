import { Alert, Snackbar } from '@mui/material';
import React from 'react';

function SnackBar({ title }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
