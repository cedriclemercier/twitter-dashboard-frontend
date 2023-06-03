import { useEffect, useState, useCallback } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, CircularProgress } from '@mui/material';
//
import Iconify from '../iconify';

const TwitterButton = styled(Button)(({ theme }) => ({}));

export default function TwitterLogin({ login }) {


  return (
    <TwitterButton
      variant="outlined"
      onClick={() => {
        login();
      }}
    >
      Log in with Twitter
    </TwitterButton>
  );
}
