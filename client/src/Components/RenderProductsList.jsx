import { Card, CardMedia, Stack } from '@mui/material';
import React from 'react';

function RenderProductsList({ data }) {
  return (
    <Stack py={3}>
      {data?.map((ele) => {
        return (
          <Card sx={{ maxWidth: 345, maxHeight: 500 }} key={ele?._id}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={ele?.productsImage}
            />
          </Card>
        );
      })}
    </Stack>
  );
}

export default RenderProductsList;
