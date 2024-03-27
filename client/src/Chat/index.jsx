import React, { useCallback, useMemo, useState } from 'react';
import SearchBar from '../FormComponents/SearchBar';
import MuiContainer from '../HOC/MuiContainer';
import FormProvider from '../FormComponents/FormProvider';
import { useForm } from 'react-hook-form';
import { useUserSearchQuery } from '../redux/actions/chatAction';
import { handleWithDebounce } from '../utils/handleWithDebounce';
import { Box, Stack, Typography } from '@mui/material';

function Chats() {
  const [userData, setUserData] = useState({ email: '', name: '' });

  const methods = useForm({ defaultValues: { users: '' } });

  const filter = useMemo(
    () => (userData?.email || userData?.name ? userData : ''),
    [userData]
  );

  const { data, refetch } = useUserSearchQuery(filter);

  const { handleSubmit } = methods;

  const onSearch = useCallback(async (data) => refetch(), [refetch]);

  const handleOnInput = handleWithDebounce((e) =>
    setUserData({ email: e.target.value, name: e.target.value })
  );

  return (
    <MuiContainer maxWidth="lg" sx={{ padding: '10px' }}>
      <MuiContainer maxWidth="sm" sx={{ padding: '10px' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSearch)}>
          <SearchBar
            name="users"
            label="Search users"
            options={data?.data || []}
            onInput={handleOnInput}
            filterWith="email"
            placeholder=""
            filterSelectedOptions={true}
            renderOption={(props, option) => {
              const newProps = { ...props, key: props.id };
              return (
                <Stack
                  key={newProps.key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    style={{
                      flexGrow: 1,
                    }}
                    {...newProps}
                  >
                    <Typography>{`${option['name']} (${option['email']})`}</Typography>
                  </Box>
                </Stack>
              );
            }}
          />
        </FormProvider>
      </MuiContainer>
    </MuiContainer>
  );
}

export default Chats;
