import React, { useState, useCallback, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import AuthContext from './components/context';

import { useAuth } from './hooks/auth-hook';

// ----------------------------------------------------------------------

export default function App() {
  const { token, login, logout, userId, secret } = useAuth();

  useEffect(() => {

  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
        secret,
      }}
    >
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        {/* {!userId || userId == false || userId == "false" ? <CircularProgress />: <Router />} */}
        <Router />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
