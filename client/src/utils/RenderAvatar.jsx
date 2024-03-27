import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

export function RenderAvatar({ url, userNameLogo }) {
  return url ? (
    <Avatar sx={{ bgcolor: green[500] }} src={url} />
  ) : (
    <Avatar sx={{ bgcolor: green[500] }}>{userNameLogo}</Avatar>
  );
}
export default RenderAvatar;
