import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from "../context/AuthenticationProvider";

import WalletProvider from "../context/WalletProvider";

import Home from "../screens/Home";
import Transaction from "../screens/Transaction";
import History from "../screens/History";
import Settings from "../screens/Settings";
import Authentication from "../screens/Authentication";
import ImportWallet from "../screens/ImportWallet";
import CreateWallet from "../screens/CreateWallet";

import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default NavigationProvider = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated === false && (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Authentication"
            component={Authentication}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTintColor: "white",
              title: "Import Wallet",
              headerTitleStyle: {
                fontFamily: "BalsamiqBold",
                fontSize: 25,
                marginTop: -10,
              },
              headerTitleAlign: "center",
            }}
            name="ImportWallet"
            component={ImportWallet}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTintColor: "white",
              title: "Create Wallet",
              headerTitleStyle: {
                fontFamily: "BalsamiqBold",
                fontSize: 25,
                marginTop: -10,
              },
              headerTitleAlign: "center",
            }}
            name="CreateWallet"
            component={CreateWallet}
          />
        </Stack.Navigator>
      )}
      {isAuthenticated === true && (
        <WalletProvider>
          <Tab.Navigator tabBarOptions={{ showLabel: false }}>
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="home" size={36} color={color} />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="direction" size={36} color={color} />
                ),
              }}
              name="Transaction"
              component={Transaction}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="list" size={36} color={color} />
                ),
              }}
              name="History"
              component={History}
            />
          </Tab.Navigator>
        </WalletProvider>
      )}
    </NavigationContainer>
  );
};
