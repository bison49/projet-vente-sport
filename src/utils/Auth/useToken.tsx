/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString as string);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
