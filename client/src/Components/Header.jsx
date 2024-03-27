import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import { delete_cookie } from '../utils/handleCookie';
import { initialize } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

import { enqueueSnackbar } from 'notistack';
import { useProfileQuery } from '../redux/actions/authAction';
import { useMemo } from 'react';
import styled from '@emotion/styled';
import RenderAvatar from '../utils/RenderAvatar';
import { api } from '../redux/apiInterceptor';

const pages = ['Home', 'Products', 'Chat'];

const AvatarContainer = styled.div`
  display: flex;
  & > * {
    margin: 4px;
  }
`;

function Header() {
  const dispatch = useDispatch();

  const { data, isLoading } = useProfileQuery();

  const userNameLogo = useMemo(() => {
    return data?.data?.name?.slice(0, 1)?.toUpperCase();
  }, [data?.data?.name]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { title: 'Profile', onClick: () => {} },
    { title: 'Account', onClick: () => {} },
    { title: 'Dashboard', onClick: () => {} },
    { title: 'Logout', onClick: handleLogout },
  ];

  async function handleLogout() {
    delete_cookie(['accessToken', 'refreshToken']);

    dispatch(initialize({ isAuthenticated: false }));

    dispatch(api.util.resetApiState());

    enqueueSnackbar('Logout successfully!', { variant: 'success' });
  }

  const showAvatar = useMemo(
    () => data?.data?.profileImage && !isLoading,
    [data?.data?.profileImage, isLoading]
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Stack
              direction="row"
              columnGap={2}
              alignItems="center"
              justifyContent="space-around"
              flex={1}
            >
              {pages.map((page) => {
                return (
                  <Link
                    key={page}
                    to={`/${page?.toLowerCase()}`}
                    style={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textDecoration: 'none',
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </Link>
                );
              })}
            </Stack>
            <Box sx={{ flexGrow: 0, cursor: 'pointer' }}>
              <Tooltip title="Open settings">
                <AvatarContainer
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, m: 0 }}
                >
                  {showAvatar ? (
                    <RenderAvatar
                      url={data?.data?.profileImage}
                      userNameLogo={userNameLogo}
                    />
                  ) : null}
                </AvatarContainer>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  return (
                    <MenuItem
                      key={setting.title}
                      onClick={() => {
                        handleCloseNavMenu();
                        setting.onClick();
                      }}
                    >
                      <Typography sx={{ textAlign: 'left', flex: 1 }}>
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Header;
