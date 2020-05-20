import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import AuthenticationProvider, {
  AuthenticationContext,
} from "../context/AuthenticationProvider";

import Home from "../screens/Home";
import Transaction from "../screens/Transaction";
import History from "../screens/History";
import Settings from "../screens/Settings";
import Authentication from "../screens/Authentication";
import ImportWallet from "../screens/ImportWallet";
import CreateWallet from "../screens/CreateWallet";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default NavigationProvider = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated === false && (
        <Stack.Navigator>
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="ImportWallet" component={ImportWallet} />
          <Stack.Screen name="CreateWallet" component={CreateWallet} />
        </Stack.Navigator>
      )}
      {isAuthenticated === true && (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Transaction" component={Transaction} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
