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
import TokenInfo from "../components/TokenInfo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Octicons, FontAwesome5 } from "@expo/vector-icons";
import HomeCollapsible from "../components/HomeCollapsible";

import * as JsSearch from "js-search";
import axios from "axios";
import {
  Jhaystack,
  TraversalStrategy,
  ComparisonStrategy,
  SortingStrategy,
} from "jhaystack";

import { WalletContext } from "../context/WalletProvider";

const { height, width } = Dimensions.get("window");

export default Home = () => {
  const [searchResult, setSearchResult] = useState(null);
  
  const searchJSONData = (data, searchPhrase) => {
    const se = new Jhaystack()
      .setTraversalStrategy(
        TraversalStrategy.RETURN_ROOT_ON_FIRST_MATCH_ORDERED
      )
      .setComparisonStrategy([
        ComparisonStrategy.STARTS_WITH,
        ComparisonStrategy.FUZZY_SEQUENCE,
      ])
      .setSortingStrategy([SortingStrategy.SORT_BY_ATTRIBUTE])
      .setLimit(2)
      .setDataset(data);
    const results = se.search(searchPhrase);
    setSearchResult(results);
  };

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
      <View
        style={styles.topElementsView}
      >
        <View style={{ paddingLeft: 30 }}>
          <Text style={[styles.cardHeading, { color: currentAccountColor }]}>
            Accounts
          </Text>
        </View>
        <View
          style={styles.topElementsViewRight}
        >
          <FontAwesome5 name="pen" style={styles.topElementLeftIcon} size={24} color={currentAccountColor} />
          <Octicons name="gear" style={styles.topElementRightIcon} size={30} color={currentAccountColor} />
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
        <HomeCollapsible heading={"Funds"} operation={"funds"} />
        <HomeCollapsible heading={"History"} operation={"history"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  cardHeading: {
    // textShadowColor: "rgba(0.75, 0.75, 0.75, 0.75)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
    fontSize: 30,
    fontFamily: "BalsamiqBold",
  },
  topElementsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topElementsViewRight: { paddingRight: 30, paddingTop: 10, flexDirection: "row" },
  topElementRightIcon: {paddingLeft: 5}, 
  topElementLeftIcon: {paddingRight: 5},
  balanceCardsList: { paddingHorizontal: 20, height: 230 }
});
