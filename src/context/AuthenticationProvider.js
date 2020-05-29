import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const AuthenticationContext = createContext();

export default AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("wallet").then(wallet =>
      wallet !== null
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false)
    );
  }, []);

  const login = async () => {
    setIsAuthenticated(true);
  }

  const logout = async () => {
    await AsyncStorage.clear();
    setIsAuthenticated(false);
  }

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
