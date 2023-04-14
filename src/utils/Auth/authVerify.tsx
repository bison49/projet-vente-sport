/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { logout } from './logout';
import useToken from './useToken';
import useUser from './useUser';

const AuthVerify = () => {
  const location = useLocation();

  const { token } = useToken();
  const { user } = useUser();

  async function disconnect(id: number) {
    await logout(id);
  }

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        disconnect(user.id);
      }
    }
  }, [location]);

  return <div></div>;
};

export default AuthVerify;
