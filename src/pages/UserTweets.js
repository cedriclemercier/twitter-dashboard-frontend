import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

// @mui
import Iconify from '../components/iconify';
import { AuthContext } from 'src/components/context/auth-context';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress, Stack, Button } from '@mui/material';
import { useEffect, useState, useCallback, useContext } from 'react';
import { TweetCard } from '../sections/@dashboard/app';
// components

// ----------------------------------------------------------------------

export default function UserTweets() {
  const auth = useContext(AuthContext);
  const { username } = useParams();

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState(false);

  const refreshTweets = useCallback(async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_API}/api/tweets?userId=${auth.userId}`, {
        oauth_token: auth.token,
        oauth_token_secret: auth.secret,
        ids: tweets.length > 0 ? [tweets[0].author_id] : [],
        username: username
      })
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsError(true);
    }
    setTweets(response.data.tweets);
    setIsLoading(false);
  });

  const deleteAll = async () => {
    setIsLoading(true);
    setIsError(false)
    let response;
    try {
      response = await axios.delete(
        `${process.env.REACT_APP_API}/api/tweets/account/${username}`
      );
    } catch(err) {
      setIsError(err)
      setIsLoading(false);
      setTweets([]);
      return
    }

    if (response) {
      window.location.href = '/'
    }
  }

  const loadTweetsForAccount = useCallback(async () => {
    setIsLoading(true);
    setIsError(false)
    let response;
    try {
      response = await axios.get(
        `${process.env.REACT_APP_API}/api/tweets/account/${username}`
      );
    } catch (err) {
      setIsError(err)
      setIsLoading(false);
      setTweets([]);
      return
    }
    setTweets(response.data.tweets);
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    loadTweetsForAccount();
  }, [loadTweetsForAccount]);

  return (
    <>
      <Helmet>
        <title> {username} tweets - Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Stack
          direction="row"
          justifyContent="right "
          alignItems="right"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Button onClick={() => {
            deleteAll();
          }}>
            Delete
          </Button>
          <Button onClick={() => {
            refreshTweets();
          }} variant="outlined" ><Iconify sx={{ mr: 1 }} icon="eva:refresh-fill" />Refresh</Button>
        </Stack>
        <Grid container spacing={3}>
          {isError &&
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>{isError.message}</Typography>
              <Typography>{isError.message}</Typography>
            </Grid>
          }
          {isLoading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {!isLoading && tweets.length == 0 && 'User has no tweets yet. Or try to refresh?'}
          {!isLoading &&
            tweets.length > 0 &&
            tweets.map((tweet, index) => <TweetCard key={tweet._id} index={index} content={tweet} />)}
        </Grid>
      </Container>
    </>
  );
}
