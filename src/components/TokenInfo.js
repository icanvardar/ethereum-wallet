import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { WalletContext } from "../context/WalletProvider";
import axios from "axios";

const TokenInfo = (props) => {
  const {
    wallet,
    accountCount,
    currentAccountIndex,
    isNewToken,
    addNewToken,
    currentAccountAddress,
    currentAccountColor,
  } = useContext(WalletContext);

  const getTokenBalances = () => {
    axios
      .get(
        `https://api.ethplorer.io/getAddressInfo/${currentAccountAddress}?apiKey=freekey`
      )
      .then((data) => {
        console.log(data.data);
        setTokenBalances(data.data.tokens);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(props.fetchable);
  }, [props.fetchable])

  return (
    <View style={styles.container}>
      <Text>Token</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TokenInfo;
