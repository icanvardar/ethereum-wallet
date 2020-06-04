import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";

import { WalletContext } from "../context/WalletProvider";
import TokenInfo from "./TokenInfo";
import HistoryInfo from "./HistoryInfo";
const { height, width } = Dimensions.get("window");

const HomeCollapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenBalances, setTokenBalances] = useState(null);
  const [ethTxnHistory, setETHTxnHistory] = useState(null);
  const [tokenTxnHistory, setTokenTxnHistory] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);

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

  const getEthereumTransactionHistory = () => {
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP`)
    .then(data => {
      console.log(data.data.result);
      setETHTxnHistory(data.data.result);
    })
    .catch((err) => console.log(err));
}

  const getTokenTransactionHistory = () => {
      axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&page=1&offset=10&sort=asc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP`)
      .then(data => {
        console.log(data.data.result);
        setTokenTxnHistory(data.data.result);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // getTokenBalances()
    // getTokenTransactionHistory();
    // getEthereumTransactionHistory();
  }, []);

  const {
    wallet,
    accountCount,
    currentAccountIndex,
    isNewToken,
    addNewToken,
    currentAccountAddress,
    currentAccountColor
  } = useContext(WalletContext);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={[styles.infoView, { backgroundColor: currentAccountColor }]}>
          <View style={styles.infoViewInside}>
            <View style={styles.infoViewLeft}>
              <Text style={styles.infoViewText}>
                  {
                    props.operation === "funds" ?
                    <Entypo name="wallet" size={24} color="white" />
                    :
                    <FontAwesome5 name="history" size={20} color="white" />
                  }
                  {" " + props.heading}
                </Text>
            </View>
            <View style={styles.infoViewRight}>
              {isOpen ? (
                <Ionicons
                  style={styles.infoViewIcon}
                  name="ios-arrow-up"
                  size={24}
                  color="white"
                />
              ) : (
                <Ionicons
                  style={styles.infoViewIcon}
                  name="ios-arrow-down"
                  size={24}
                  color="white"
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <View style={styles.infoViewCollapsible}>
          {
              props.operation === "funds" ?
              <TokenInfo></TokenInfo>
              :
                <HistoryInfo></HistoryInfo>
          }
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoView: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "#fff",
    height: 50,
    width: width / 1.2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, 0.4)",
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  infoViewCollapsible: {
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "flex-start",
    borderColor: "#fff",
    height: 50,
    width: width / 1.3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    marginTop: -20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, 0.4)",
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  infoViewInside: { justifyContent: "space-between", flexDirection: "row" },
  infoViewLeft: { flex: 1 },
  infoViewRight: { flex: 1, alignItems: "flex-end" },
  infoViewText: {
    color: "white",
    fontFamily: "Balsamiq",
    paddingLeft: 20,
    fontSize: 25,
  },
  infoViewIcon: { paddingRight: 20, paddingTop: 5 },
});

export default HomeCollapsible;
