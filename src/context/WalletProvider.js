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

  useEffect(() => {
    wallet !== null && setCurrentAccountAddress(wallet.accounts[currentAccountIndex].address);
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
      tokenAddresses: [
        {
          name: "Tether",
          symbol: "USDT",
          image: "https://ethplorer.io/images/tether.png",
          address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          decimals: "6"
        },
        {
          name: "HoloToken",
          symbol: "HOT",
          image: "http://ethplorer.io/images/holo.png",
          address: "0x6c6ee5e31d828de241282b9606c8e98ea48526e2",
          decimals: "18"
        }
      ]
    });
    tempWallet.accountsCount = accountsCount;
    setWallet(tempWallet);
    await AsyncStorage.setItem("wallet", JSON.stringify(tempWallet));
    setIsNewAccount(false);
  };

  const addNewToken = async (accountIndex, tokenObject) => {
    setIsNewToken(true);
    const { name, symbol, image, address, decimals } = tokenObject;

    const tokenInstance = {
      name,
      symbol,
      image,
      address,
      decimals,
    };

    let tempWallet = wallet;
    tempWallet.accounts[accountIndex].tokenAddresses.push(tokenInstance);
    setWallet(tempWallet);
    await AsyncStorage.setItem("wallet", JSON.stringify(tempWallet));
    setIsNewToken(false);
  };

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
        addNewToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
