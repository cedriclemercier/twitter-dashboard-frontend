import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  secret: '',
  userId: '',
  login: () => {},
  logout: () => {}
});
