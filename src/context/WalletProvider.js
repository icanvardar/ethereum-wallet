import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const WalletContext = createContext();

const WalletProvider = ({children}) => {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("wallet").then(wallet => setWallet(JSON.parse(wallet)));
    }, []);

    return (
        <WalletContext.Provider value={{wallet}}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider;