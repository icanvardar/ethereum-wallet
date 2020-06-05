import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";
import { ethers } from "ethers";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [accountCount, setAccountCount] = useState(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isNewToken, , setIsNewToken] = useState(false);
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [currentAccountAddress, setCurrentAccountAddress] = useState(null);
  const [currentAccountColor, setCurrentAccountColor] = useState(null);

  useEffect(() => {
    if (wallet !== null) {
      setCurrentAccountAddress(wallet.accounts[currentAccountIndex].address);
      setCurrentAccountColor(wallet.accounts[currentAccountIndex].accountColor);
    }
  }, [wallet, currentAccountIndex])

  useEffect(() => {
    AsyncStorage.getItem("wallet")
      .then((walletInstance) => {
        setWallet(JSON.parse(walletInstance));
        return AsyncStorage.getItem("accountCount");
      })
      .then((accountCountInstance) =>
        setAccountCount(parseInt(accountCountInstance))
      )
      .catch((error) => console.log(error));
  }, []);

  const addNewAccount = async () => {
    setIsNewAccount(true);
    let tempWallet = wallet;
    const accountsCount = tempWallet.accountsCount + 1;
    let mnemonicWallet = ethers.Wallet.fromMnemonic(
      tempWallet.mnemonic,
      `m/44'/60'/0'/0/${accountsCount}`
    );
    tempWallet.accounts.push({
      address: mnemonicWallet.signingKey.address,
      accountName: `Account ${accountsCount + 1}`,
      accountColor: "#9147FF"
    });
    tempWallet.accountsCount = accountsCount;
    setWallet(tempWallet);
    await AsyncStorage.setItem("wallet", JSON.stringify(tempWallet));
    setIsNewAccount(false);
  };

  const createTx = (type) => {
    const txInstance = {
      txHash: "hash",
      from: "you",
      to: "me",
      amount: "1",
      timeStamp: "12312312",
      tokenInfo: {
        contractAddress: "ca",
        tokenName: "name",
        tokenSymbol: "symbol"
      }
    }
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        accountCount,
        addNewAccount,
        isNewAccount,
        currentAccountIndex,
        currentAccountAddress,
        setCurrentAccountIndex,
        isNewToken,
        currentAccountColor
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
