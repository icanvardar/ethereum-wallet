import React, { useState, useEffect, useContext } from "react";
import NavigationProvider from "./src/navigation/NavigationProvider";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// loads defined fonts to app once
const fetchFonts = async () => {
  await Font.loadAsync({
    Monoton: require("./src/assets/fonts/Monoton/Monoton-Regular.ttf"),
    Balsamiq: require("./src/assets/fonts/BalsamiqSans/BalsamiqSans-Regular.ttf"),
    BalsamiqBold: require("./src/assets/fonts/BalsamiqSans/BalsamiqSans-Bold.ttf"),
  });
};

export default function App() {
  // checks if initial data are loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  // loads needed initial data in asynchronous way
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <AuthenticationProvider>
      <NavigationProvider />
    </AuthenticationProvider>
  );
}
