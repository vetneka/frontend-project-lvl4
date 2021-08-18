import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { authContext } from '../contexts/index';

import getAuthInfo from '../getAuthInfo';

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(() => getAuthInfo());
  const loggedIn = !!authInfo?.token;

  const history = useHistory();
  const location = useLocation();

  const logIn = (data) => {
    const { from } = location.state || { from: { pathname: '/' } };

    localStorage.setItem('userId', JSON.stringify(data));
    setAuthInfo(data);
    history.replace(from);
  };

  const logOut = () => {
    const { from } = location.state || { from: { pathname: '/login' } };

    localStorage.removeItem('userId');
    setAuthInfo(null);
    history.push(from);
  };

  return (
    <authContext.Provider value={{
      authInfo, loggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
