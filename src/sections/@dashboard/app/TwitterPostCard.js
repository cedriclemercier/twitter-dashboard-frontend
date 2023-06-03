import PropTypes from 'prop-types';
import moment from 'moment'
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button, CircularProgress } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Typography)({
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontSize: 20,
});

const StyledSubtitle = styled(Link)({
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontSize: 14,
  color: '#5F636B',
});

const StyledSubtitle2 = styled(Typography)({
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontSize: 14,
  color: '#5F636B',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledVerifiedBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  color: theme.palette.primary.main,
  top:0,
  right:0
}))

const StyledTitleArea = styled('div')(({ theme }) => ({
  width: '100%',
}));

const StyledFollowButton = styled(Button)(({ theme }) => ({
  width: '100%'
}))

// ----------------------------------------------------------------------

TwitterPostCard.propTypes = {
  content: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function TwitterPostCard({ content, index, followHandler, isFollowing }) {
  const { username, name, profile_image_url, profile_banner_url, description, verified, created_at, public_metrics } = content;
  const twitterLink = 'https://twitter.com/';
  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];

  return (
    <Grid item xs={3}>
      <Card sx={{ position: 'relative' }}>

        {verified && <StyledVerifiedBadge>
        <Iconify icon="eva:checkmark-circle-2-fill" sx={{ width: 40, height: 40, mr: 0.5 }} />
        </StyledVerifiedBadge>}
        
        <StyledCardMedia>
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <StyledAvatar
            alt={name}
            src={profile_image_url}
          />

          <StyledCover alt={name} src={profile_banner_url} />
        </StyledCardMedia>

        <CardContent sx={{ pt: 4 }}>

          <StyledTitleArea>
            <StyledTitle color="inherit" component="h3" variant="subtitle1" underline="hover">
              {name}
            </StyledTitle>
            <StyledSubtitle
              color="inherit"
              component="a"
              variant="subtitle3"
              underline="hover"
              href={twitterLink + username}
              target="_blank"
              rel="noopener"
            >
              @{username}
            </StyledSubtitle>
            <StyledSubtitle2 component="p" variant="subtitle3" sx={{ mt: 1, mb: 2 }}> <Iconify icon="eva:calendar-outline" sx={{ width: 16, height: 16, mr: 0.5 }} /> Joined {moment(created_at).format('ll')}</StyledSubtitle2>
          </StyledTitleArea>

          <Typography sx={{ fontSize: 14 }} variant="subtitle3">

            <strong>{public_metrics.followers_count}</strong> Followers | <strong>{public_metrics.following_count}</strong> Follows
          </Typography>

          <Typography sx={{ mt: 3 }}>{description}</Typography>
          <StyledFollowButton
            variant="contained" 
            sx={{ mt: 4 }}
            onClick={followHandler}
            >
              {isFollowing ? <CircularProgress color="success" size={24} /> : 'Follow' }
            </StyledFollowButton>
        </CardContent>
      </Card>
    </Grid>
  );
}
