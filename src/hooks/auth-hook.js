import { useState, useCallback, useEffect } from 'react';


export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [secret, setSecret] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, secret) => {
    setToken(token);
    setUserId(uid);
    setSecret(secret);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        secret
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setSecret(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {

  }, [token, userId, secret])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      storedData.secret &&
      storedData.userId !== "false"
    ) {
      login(storedData.userId, storedData.token, storedData.secret);
    }
  }, [login]);

  return { token, login, logout, userId, secret };
};