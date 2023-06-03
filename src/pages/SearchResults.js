import axios from 'axios';
import { Helmet } from 'react-helmet-async';

// @mui
import Iconify from '../components/iconify';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress, Stack, Button } from '@mui/material';
import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { TwitterPostCard } from '../sections/@dashboard/app';
import { AuthContext } from 'src/components/context/auth-context';
// components

// ----------------------------------------------------------------------

export default function SearchResults({ result, isLoading, setSearchResults }) {
    const query = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [error, setError] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const followHandler = async () => {
        let res;
        try {
            setIsFollowing(true)
            res = await axios.post(`${process.env.REACT_APP_API}/api/accounts/follow`, { userId: auth.userId, ...result })
        } catch (err) {
            setError(true)
            setIsFollowing(false)
            console.log(err)
        }
        setIsFollowing(false)

        console.log(res)
        if (res.data.statusCode == 200) {
            setSearchResults(null)
            navigate('/dashboard/app/' + result.user.username)
        }
    };

    return (
        <>
            <Helmet>
                <title> Search Results </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Search results
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="right "
                    alignItems="right"
                    spacing={2}
                    sx={{ mb: 2 }}
                >
                </Stack>
                <Grid container spacing={3}>
                    {isLoading && <CircularProgress />}
                    {!isLoading && result.user  &&
                        <TwitterPostCard content={result.user} index={1} followHandler={followHandler} isFollowing={isFollowing} />}
                    {!isLoading && !result.user && <Typography variant="p" sx={{ mb: 5 }}>
                        No results found for username. Did you type the name correctly?
                    </Typography>}
                </Grid>
            </Container>
        </>
    );
}
