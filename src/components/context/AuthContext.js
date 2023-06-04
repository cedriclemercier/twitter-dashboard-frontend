import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  secret: '',
  userId: '',
  login: () => {},
  logout: () => {}
});

export default AuthContext;
