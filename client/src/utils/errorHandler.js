import { enqueueSnackbar } from 'notistack';

export function errorHandler(errorObj, isToaster, url) {
  const error =
    errorObj?.data?.error ||
    errorObj?.data?.message ||
    errorObj?.error?.data?.error ||
    errorObj?.error?.data?.message ||
    errorObj?.error ||
    errorObj?.message ||
    errorObj?.error?.error;

  if (typeof error === 'string' && isToaster) {
    enqueueSnackbar(error, { variant: 'error' });
  }
  return error;
}
