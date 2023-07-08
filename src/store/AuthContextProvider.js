import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import ExpenseContext from "./expense-context";


const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const expCtx = useContext(ExpenseContext);

    if (token == null && localStorage.length !== 0) {
      setToken(localStorage["user"]);
      setUserEmail(localStorage['userEmail'])
    }
  const userLoggedIn = !!token;

  const loginHandler = (tokenId, email) => {
    setToken(tokenId);
    setUserEmail(email);
    expCtx.onLogin();
    localStorage.setItem('user', tokenId);
    localStorage.setItem('userEmail', email);
    
  };

  const logoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
  };
  

  const authContext = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail, 
    login: loginHandler,
    logout: logoutHandler,
  };
  

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;