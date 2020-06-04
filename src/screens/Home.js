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
import { Ionicons } from "@expo/vector-icons";
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
  const [ethBalance, setETHBalance] = useState(null);

  const getETHBalance = () => {
    axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=YourApiKeyToken`
    )
    .then((data) => {
      console.log(data.data.result);
      setETHBalance(data.data.result);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
      // getETHBalance();
  }, []);

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
    currentAccountAddress
  } = useContext(WalletContext);

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
      <View style={{ flex: 2, alignItems: "center" }}>
        <HomeCollapsible heading={"Funds"} operation={"funds"}/>
        <HomeCollapsible heading={"History"} operation={"history"}/>
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
  }
});
