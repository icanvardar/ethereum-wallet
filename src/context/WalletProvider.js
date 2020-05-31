import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";
import {ethers} from "ethers";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [accountCount, setAccountCount] = useState(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("wallet")
      .then((walletInstance) => {
        setWallet(JSON.parse(walletInstance));
        return AsyncStorage.getItem("accountCount");
      })
      .then((accountCountInstance) => setAccountCount(parseInt(accountCountInstance)))
      .catch(error => console.log(error));
  }, []);

  const addNewAccount = async () => {
    setIsNewAccount(true);
    let tempWallet = wallet;
    const accountsCount = tempWallet.accountsCount + 1;
    let mnemonicWallet = ethers.Wallet.fromMnemonic(tempWallet.mnemonic, `m/44'/60'/0'/0/${accountsCount}`);
    tempWallet.accounts.push({
      address: mnemonicWallet.signingKey.address,
      accountName: `Account ${accountsCount + 1}`
    });
    tempWallet.accountsCount = accountsCount;
    setWallet(tempWallet);
    await AsyncStorage.setItem("wallet", JSON.stringify(tempWallet));
    setIsNewAccount(false);
  }

  return (
    <WalletContext.Provider value={{ wallet, accountCount, addNewAccount, isNewAccount, currentAccount, setCurrentAccount }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
