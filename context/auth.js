import React, {createContext, useState, useContext, useEffect} from 'react';
import Router from 'next/router'
import api from '../services/api';
import {isExpired, decodeToken} from 'react-jwt';
import Stream from '../pages/stream';
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    /// get token from cooki
    async function loadUserFromCookie() {
      const user = localStorage.getItem('user');
      if (user) {
        api.defaults.headers.Authorization = `${user.accessToken}`;
        if (user) setUser;
      }
      setIsLoading(false);
    }
    loadUserFromCookie();
  }, []);



  const login = async (username, password) => {
    const clientId =
      'yKSUB9w7TA4J2Vv0asEc3I1aikN0SZirbEj1FPXSkDiMs3CjhXx5ad3Ryi10Xpag';
    const response = await api.post('/loginuser', {
      username,
      password,
      clientId,
    });
    if (response.status === 200 && response.data.accessToken) {
      const {
        data: {accessToken},
      } = response;
      if (isExpired(accessToken)) {
        return false;
      }
      const user = decodeToken(accessToken);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (accessToken) {
        api.defaults.headers.Authorization = `${accessToken}`;
      }
    debugger
      Router.replace("/stream")
    }
  };

  const logOut = () => {
    Cookies.remove('auth token');
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider value={{user, isLoading, login, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


export const protectiveRoutes = ({Component}) => {
  const {user} = useAuth();
  debugger
  if(!user){
    Router.replace("/")
  }
  return < Component />
}