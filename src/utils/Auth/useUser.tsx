/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function useUser() {
  const getUser = () => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString as string);
    return user;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return {
    setUser: saveUser,
    user,
  };
}
