import PropTypes from 'prop-types';
import { useContext } from 'react';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// Context
import AuthContext from '../../../components/context';
import {TwitterLogin} from '../../../components/buttons';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, search }) {
  const auth = useContext(AuthContext);

  const loginHandler = async () => {
    let res;
    try {
      res = await axios.get(`${process.env.REACT_APP_API}/api/auth/twitter`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar search={search} />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        > 
          {!auth.token ? (
            <div>
              {/* <a href={`${process.env.REACT_APP_API}/api/auth/twitter`}>Login to twitter</a> */}
            <TwitterLogin login={loginHandler} />
            </div>
          ) : (
            <div>
              {/* <NotificationsPopover /> */}
              <AccountPopover />
              <Button onClick={() => {
                auth.logout();
                window.location.href = '/';
              }}>Log out</Button>
            </div>
          )}
          {/* <TwitterLogin /> */}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
