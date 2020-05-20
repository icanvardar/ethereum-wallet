import React, { useState, useContext } from "react";
import NavigationProvider from "./src/navigation/NavigationProvider";

export default function App() {
  return (
    <AuthenticationProvider>
      <NavigationProvider/>
    </AuthenticationProvider>
  );
}
