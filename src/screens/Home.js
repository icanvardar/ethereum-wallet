import React, { useRef, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import AccountCard from "../components/AccountCard";
import { Ionicons, Octicons, FontAwesome5 } from "@expo/vector-icons";
import Collapsible from "../components/Collapsible";

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

  const {
    wallet,
    accountCount,
    currentAccountIndex,
    isNewToken,
    addNewToken,
    currentAccountAddress,
    currentAccountColor,
  } = useContext(WalletContext);

  return (
    <View style={styles.container}>
      <View style={styles.topElementsView}>
        <View style={{ paddingLeft: 30 }}>
          <Text style={[styles.cardHeading, { color: currentAccountColor }]}>
            Accounts
          </Text>
        </View>
        <View style={styles.topElementsViewRight}>
          <FontAwesome5
            name="pen"
            style={styles.topElementLeftIcon}
            size={24}
            color={currentAccountColor}
          />
          <Octicons
            name="gear"
            style={styles.topElementRightIcon}
            size={30}
            color={currentAccountColor}
          />
        </View>
      </View>
      <View>
        <FlatList
          style={styles.balanceCardsList}
          data={wallet && wallet.accounts}
          renderItem={({ item, index }) => (
            <AccountCard
              length={wallet && wallet.accounts.length}
              index={index}
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
      <View style={{ alignItems: "center" }}>
        <Collapsible heading={"Recent"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "aliceblue",
  },
  cardHeading: {
    fontSize: 30,
    fontFamily: "BalsamiqBold",
  },
  topElementsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topElementsViewRight: {
    paddingRight: 30,
    paddingTop: 10,
    flexDirection: "row",
  },
  topElementRightIcon: { paddingLeft: 5 },
  topElementLeftIcon: { paddingRight: 5 },
  balanceCardsList: { paddingHorizontal: 20, height: 230 },
});
