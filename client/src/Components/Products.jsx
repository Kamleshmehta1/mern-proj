import React, { useCallback } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../FormComponents/FormProvider';
import RHFButton from '../FormComponents/RHFButton';
import MuiContainer from '../HOC/MuiContainer';
import {
  useGetAllProductsQuery,
  useUploadProductsMutation,
} from '../redux/actions/productsAction';
import Input from '../FormComponents/Input';
import RenderProductsList from './RenderProductsList';

function Products() {
  const { data } = useGetAllProductsQuery();
  const [uploadProducts, { isLoading }] = useUploadProductsMutation();

  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { avatar: '' },
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const dataObject = new FormData();
      dataObject.append('avatar', data?.avatar);
      await uploadProducts(dataObject);
    },
    [uploadProducts]
  );

  return (
    <MuiContainer maxWidth="lg" sx={{ padding: '10px' }}>
      <MuiContainer maxWidth="sm" sx={{ padding: '10px' }}>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack spacing={2}>
            <Input name="avatar" type="file" />
            <RHFButton
              type="submit"
              title="Upload"
              variant="contained"
              isLoading={isLoading}
            />
          </Stack>
        </FormProvider>
      </MuiContainer>
      <RenderProductsList data={data?.data} />
    </MuiContainer>
  );
}

export default Products;
