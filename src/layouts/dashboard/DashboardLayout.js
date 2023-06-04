import { useState, useCallback, useEffect,useContext } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
//
import AuthContext from '../../components/context';
import SearchResults from '../../pages/SearchResults';
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const auth = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [isUser, setUser] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAccounts = useCallback(async (query) => {
    let res;

    try {
      setIsLoading(true)
      res = await axios.get(`${process.env.REACT_APP_API}/api/accounts/${query}?oauth_token=${auth.token}&oauth_token_secret=${auth.secret}`)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
    }
    console.log(res.data)
    setSearchResults(res.data)
    setUser(false)
    setIsLoading(false)
  })

  useEffect(() => {

  }, [isUser])

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} search={fetchAccounts} />

      <Nav setSearchResults={setSearchResults} openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        {searchResults ? <SearchResults result={searchResults} isLoading={isLoading} setSearchResults={setSearchResults} />: <Outlet />}
      </Main>
    </StyledRoot>
  );
}
