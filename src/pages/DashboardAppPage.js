import axios from 'axios';

import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress, Button, Stack } from '@mui/material';
import { useEffect, useState, useCallback, useContext } from 'react';

// components
import Iconify from '../components/iconify';
import { TweetCard } from '../sections/@dashboard/app';
import { responsiveFontSizes } from 'src/theme/typography';
import { AuthContext } from 'src/components/context/auth-context';

// sections

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tweets, setTweets] = useState([{}]);
  const [isOutdated, setIsOutdated] = useState([])

  const refreshTweets = useCallback(async () => {
    setIsRefreshing(true)
    loadTweets();
    setIsRefreshing(false)
  });

  const loadTweets = useCallback(async () => {
    console.log('Loading tweets...')
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_API}/api/tweets?userId=${auth.userId}`);
    } catch (err) {
      console.log(err);
      setIsError(err.response.data)
      setIsLoading(false);
    }
    response = response.data
    setTweets(response.tweets);

    if (response.outdated_timelines) {
      if (response.outdated_timelines.length > 0) { 
        // setIsOutdated(response.outdated_timelines); 
        console.log('outdated tweets') }
        let newResponse;
        try {
          newResponse = await fetchTweets(response.outdated_timelines);
        } catch(err) {
          console.log(err)
          setIsError(true)
          setIsLoading(false);
        }
        setTweets(newResponse.tweets);
    }
    setIsLoading(false);
  }, []);

  const fetchTweets =async (outdated) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_API}/api/tweets?userId=${auth.userId}`, {
        oauth_token: auth.token,
        oauth_token_secret: auth.secret,
        ids: outdated
      })
    } catch (err) {
      console.log(err.response.data);
    }
    setIsLoading(false);

    return response.data
  }

  useEffect(() => {
    loadTweets();
    console.log('outdated?', isOutdated.length)
    if (isOutdated.length > 0) {
      console.log('Content outdated. Requesting new tweets from API...')
      // fetchTweets();
    }
  }, [loadTweets]);

  



  return (
    <>
      <Helmet>
        <title> Twitter Dashboard - Welcome </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" >
            Hi, Welcome back
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="right "
          alignItems="right"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Button onClick={() => {
            refreshTweets();
          }} variant="outlined" ><Iconify sx={{ mr: 1 }} icon="eva:refresh-fill" />Refresh</Button>
        </Stack>

        <Grid container spacing={3}>
          {!auth.userId && <Grid item xs={12}><Typography variant="p" sx={{ mt: 15 }}>You are not logged in!</Typography></Grid>}
          {isLoading && !isError && auth.userId &&
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          }
          {!isLoading && !isError &&
            tweets.length > 1 && tweets.map((tweet, index) => (
              <TweetCard key={tweet._id} index={index} content={tweet} loadTweets={loadTweets} />
            ))}

          {isError && <Grid item xs={12}><Typography variant="p" sx={{ mt: 15 }}>{isError.message || '😢 Oh no! There has been an error. Please try again later!'}</Typography></Grid>}
        </Grid>
      </Container>
    </>
  );
}
