import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const AuthenticationContext = createContext();

export default AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("currentUser").then((currentUser) =>
      currentUser !== null
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false)
    );
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
