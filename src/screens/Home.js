import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import AccountCard from "../components/AccountCard";
import { LinearGradient } from "expo-linear-gradient";

import { WalletContext } from "../context/WalletProvider";

const { height, width } = Dimensions.get("window");

export default Home = () => {
  let listRef = useRef(null);

  const directListItems = (index) => {
    listRef.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  const directListItemsToEnd = () => {
    listRef.scrollToEnd();
  };

  const { wallet, accountCount, currentAccount } = useContext(
    WalletContext
  );

  // if (wallet) {
  //   console.log(wallet.accounts[0].accountName);
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.cardHeading}>Accounts</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={wallet && wallet.accounts}
          renderItem={({ item, index }) => (
            <AccountCard
              length={wallet && wallet.accounts.length}
              index={index}
              accountName={wallet.accounts[index].accountName}
              directListItems={directListItems}
              directListItemsToEnd={directListItemsToEnd}
              item={item}
            />
          )}
          keyExtractor={(item) => item.address}
          horizontal={true}
          ref={(ref) => (listRef = ref)}
          scrollEnabled={false}
          ListFooterComponent={
            <AccountCard
              length={wallet && wallet.accounts.length}
              isAccountAdder={true}
              directListItems={directListItems}
              directListItemsToEnd={directListItemsToEnd}
            />
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.cardHeading}>Funds</Text>
        <Text style={styles.cardHeading}>{currentAccount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  cardHeading: {
    textShadowColor: "rgba(0.75, 0.75, 0.75, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 35,
    fontFamily: "BalsamiqBold",
    color: "white",
    paddingBottom: 10,
    paddingLeft: 25,
  },
});
