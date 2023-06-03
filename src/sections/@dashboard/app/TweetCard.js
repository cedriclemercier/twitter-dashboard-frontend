import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import SocialButtonComponent from '../../../components/buttons/SocialButton';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  // position: 'relative',
  // paddingTop: '34px',
});

const StyledTitle = styled(Typography)({
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledSubtitle = styled(Link)({
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontSize: 14,
  color: '#5F636B',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 35,
  height: 35,
  // position: 'absolute',
  // left: theme.spacing(3),
  // bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  // justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledTitleArea = styled('div')(({ theme }) => ({
  width: '100%',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  color: '#c9d1dc',
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

TweetCard.propTypes = {
  content: PropTypes.object.isRequired,
  index: PropTypes.number,
};

// ----------------- FUNCTIONS --------------------------------

const interactHandler = async (action, tweetid, userId, token, secret) => {
  console.log(`You ${action} ${tweetid}`);
  const data = {
    userId: userId,
    oauth_token: token,
    oauth_token_secret: secret
  }
  console.log(data)

  let response;
  try {
    response = await axios(
      {
        url: `${process.env.REACT_APP_API}/api/tweets/${tweetid}/${action}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }
    );
  } catch (err) {
    console.log('_tweetcard_')
    console.log(err)
    return err
  }
  return response.data;
};

// ----------------------------------------------------------------------

export default function TweetCard({ index, content, loadTweets }) {
  // const [isLiked, setIsLiked] = useState(false);

  const { username, profile_image_url, name } = content;
  const latestPostLarge = index === null;
  const latestPost = index === null || index === null;
  const twitterLink = 'https://twitter.com/';
  const interacted = true;


  const TWEET_INFO = [
    {
      number: content.public_metrics.like_count,
      icon: 'eva:heart-outline',
      action: 'like',
      interactColor: '#F91880',
      interactBgColor: '#FEE7F2',
    },
    {
      number: content.public_metrics.retweet_count,
      icon: 'eva:repeat-fill',
      action: 'rt',
      interactColor: '#00BA7C',
      interactBgColor: '#E5F8F2',
    },
    {
      number: content.public_metrics.reply_count,
      icon: 'eva:message-circle-outline',
      action: 'reply',
      interactColor: '#00BA7C',
      interactBgColor: '#E5F8F2',
    },
  ];

  const getInteractions = (action, element) => {
    let interacted = false;
    switch (action) {
      case 'like':
        if (content.likes.includes('63c3e834042957cf3154f9c7')) {
          console.log(action);
          interacted = true;
        }
        break;
      case 'rt':
        if (content.retweets.includes('63c3e834042957cf3154f9c7')) {
          console.log(action);
          interacted = true;
        }
        break;
      case 'reply':
        if (content.replies.includes('63c3e834042957cf3154f9c7')) {
          interacted = true;
        }
        break;
    }

    if (interacted) {
      if (element == 'color') return TWEET_INFO.filter((el) => el.action == action)[0].interactColor;
      return TWEET_INFO.map((el) => el.action == action)[0].interactBgColor;
    }
  };

  // useEffect(() => {
  //   getInteractions('like', 'color')
  //   getInteractions('rt', 'color')
  //   getInteractions('reply', 'color')
  // }, [getInteractions]);

  // console.log(isLiked)
  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 4}>
      <Card sx={{ position: 'relative' }}>
        <Stack direction="row" spacing={2} pt={3} pl={3} alignItems="stretch">
          <StyledCardMedia
            sx={{
              ...((latestPostLarge || latestPost) && {
                pt: '34px',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
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
                ...((latestPostLarge || latestPost) && { display: 'none' }),
              }}
            />
            <StyledAvatar
              alt={username}
              src={profile_image_url}
              sx={{
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40,
                }),
              }}
            />
          </StyledCardMedia>

          <StyledTitleArea>
            <StyledTitle color="inherit" component="h2" variant="subtitle1" underline="hover">
              {name}
            </StyledTitle>
            <StyledSubtitle
              color="inherit"
              component="a"
              variant="subtitle3"
              underline="hover"
              href={twitterLink + username + '/status/' + content.id}
              target="_blank"
              rel="noopener"
            >
              @{username}
            </StyledSubtitle>
          </StyledTitleArea>

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block', minWidth: '100px' }}
          >
            {moment(content.created_at).format('ll')}
          </Typography>
        </Stack>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography>{content.text}</Typography>

          <StyledInfo>
            {TWEET_INFO.map((info, index) => (
              <SocialButtonComponent
                key={index}
                index={index}
                info={info}
                action={info.action}
                interactHandler={interactHandler}
                tweetid={content.id}
                likeStatus={content.likes.includes('63c3e834042957cf3154f9c7') ? true : false}
                rtStatus={content.retweets.includes('63c3e834042957cf3154f9c7') ? true : false}
                replyStatus={content.replies.includes('63c3e834042957cf3154f9c7') ? true : false}
              />
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
