import PropTypes from 'prop-types';
import moment from 'moment';
import { useEffect, useState, useCallback, useContext } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, CircularProgress } from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
//
import Iconify from '../iconify';

import AuthContext from '../context';

const SocialButton = styled(Button)(({ theme }) => ({
  color: '#c9d1dc',
}));

export default function SocialButtonComponent({
  index,
  info,
  action,
  interactHandler,
  tweetid,
  likeStatus,
  rtStatus,
  replyStatus,
}) {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likeStatus);
  const [isRetweeted, setIsRetweeted] = useState(rtStatus);
  const [isReplied, setIsReplied] = useState(replyStatus);

  const getColors = () => {
    if (action === 'like' && isLiked) {
      return ['#F91880', '#FEE7F2'];
    }

    if (action === 'rt' && isRetweeted) {
      return ['#00BA7C', '#E5F8F2'];
    }

    if (action === 'reply' && isReplied) {
      return ['#00BA7C', '#E5F8F2'];
    }

    return ['#c9d1dc', '#fff'];
  };

  const switchStatus = async () => {
    setIsLoading(true);
    const result = await interactHandler(info.action, tweetid, auth.userId, auth.token, auth.secret);

    setIsLoading(false);

    if (result.status === 200) {
      if (isLiked) setIsLiked(false);
      if (!isLiked) setIsLiked(true);

      if (isRetweeted) setIsRetweeted(false);
      if (!isRetweeted) setIsRetweeted(true);

      if (isReplied) setIsReplied(false);
      if (!isReplied) setIsReplied(true);
    } else {
      console.log('Result status:')
      console.log(result)
    }
  };

  useEffect(() => {
    if (isLiked) setIsLiked(true);
    if (isRetweeted) setIsRetweeted(true);
    if (isReplied) setIsReplied(true);
  }, [isLiked, isRetweeted, isReplied]);

  console.log('rendering social button');
  return (
    <SocialButton
      key={index}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.500',
        border: 1,
        borderRadius: 1,
        ml: index === 0 ? 0 : 1.5,
        color: getColors()[0],
        backgroundColor: getColors()[1],
      }}
      onClick={async () => {
        switchStatus();
      }}
    >
      {isLoading ? (
        <CircularProgress color="primary" size={15} />
      ) : (
        <div>
          <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
          <Typography variant="caption">{info.number === -1? 'n/a' : fShortenNumber(info.number)}</Typography>
        </div>
      )}
    </SocialButton>
  );
}
