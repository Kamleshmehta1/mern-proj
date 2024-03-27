import React, { useMemo } from 'react';
import { usePostsQuery } from '../redux/actions/authAction';
import TableWrapper from '../utils/TableWrapper';
import { Container, Stack, Typography } from '@mui/material';

import { data as rowData } from '../utils/data';

function Home() {
  const { data, isLoading } = usePostsQuery();

  const columns = useMemo(
    () => [
      {
        field: 'common:status',
        headerName: 'status',
        render: (row) => 'status',
      },
      {
        field: 'common:total',
        headerName: 'total',
        render: (row) => {
          return 'render';
        },
      },
      {
        field: 'common:name',
        headerName: 'name',
        render: (row) => {
          return (
            <Stack>
              <Typography variant="subtitle2">{'row'}</Typography>
              <Typography
                variant="body2"
                color={(theme) => theme.palette.grey[600]}
              >
                {row?.customer_email ? row?.customer_email : 'N/A'}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: 'common:phone',
        headerName: 'phone',
        render: (row) => {
          return row?.customer_phone ? row?.customer_phone : 'N/A';
        },
      },
      {
        field: 'common:due',
        headerName: 'due',
        render: (row) => {
          return 'render';
        },
      },
      {
        field: 'common:action',
        headerName: 'action',
        sx: { textAlign: 'center', justifyContent: 'center' },
        render: (row) => {
          return 'render';
        },
      },
    ],
    []
  );

  function handleRowClick(row) {}

  function handleDelete(row) {}

  function handleChangePage(row) {}

  function handleChangeRowsPerPage(row) {}

  return (
    <Container maxWidth="lg">
      <Stack py={3}>
        <TableWrapper
          tableTitle="Posts"
          isLoading={isLoading}
          onRowClick={handleRowClick}
          rowKey="id"
          rowData={rowData || data}
          onDelete={handleDelete}
          columns={columns}
          rowsPerPage={25}
          page={0}
          rowsPerPageOptions={[5, 10, 25]}
          handleChangePage={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Container>
  );
}

export default Home;
