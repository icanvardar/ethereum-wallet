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
import { Ionicons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { WalletContext } from "../context/WalletProvider";
import TokenInfo from "./TokenInfo";
import HistoryInfo from "./HistoryInfo";
const { height, width } = Dimensions.get("window");

const HomeCollapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ethTxnHistory, setETHTxnHistory] = useState(null);
  const [tokenTxnHistory, setTokenTxnHistory] = useState(null);

  const {
    wallet,
    accountCount,
    currentAccountIndex,
    isNewToken,
    addNewToken,
    currentAccountAddress,
    currentAccountColor,
  } = useContext(WalletContext);

  useEffect(() => {
    if (
      (props.currentCollapsible === "history" && props.operation === "funds") ||
      (props.currentCollapsible === "funds" && props.operation === "history")
    ) {
      setIsOpen(false);
    }
  }, [props.currentCollapsible]);

  const getEthereumTransactionHistory = () => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=0x8bC3da587DeF887B5C822105729ee1D6aF05A5ca&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP`
      )
      .then((data) => {
        console.log(data.data.result);
        setETHTxnHistory(data.data.result);
      })
      .catch((err) => console.log(err));
  };

  const getTokenTransactionHistory = () => {
    axios
      .get(
        `http://api.etherscan.io/api?module=account&action=tokentx&address=0xc32BE7517f37e39C3c17df9EA7397030f06E919f&startblock=0&endblock=999999999&page=1&offset=5&sort=asc&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP`
      )
      .then((data) => {
        console.log(data.data.result);
        setTokenTxnHistory(data.data.result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpen(!isOpen);
          if (props.operation === "funds") {
            props.setCurrentCollapsible("funds");
          } else if (props.operation === "history") {
            props.setCurrentCollapsible("history");
          }
        }}
      >
        <View
          style={[styles.infoView, { backgroundColor: currentAccountColor }]}
        >
          <View style={styles.infoViewInside}>
            <View style={styles.infoViewLeft}>
              <Text style={styles.infoViewText}>
                {props.operation === "funds" ? (
                  <Entypo name="wallet" size={24} color="white" />
                ) : (
                  <FontAwesome5 name="history" size={20} color="white" />
                )}
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
          {props.operation === "funds" ? (
            <TokenInfo fetchable={isOpen} />
          ) : (
            <HistoryInfo
              fetchable={isOpen}
              ethTxnHistory={ethTxnHistory}
              getEthereumTransactionHistory={getEthereumTransactionHistory}
              tokenTxnHistory={tokenTxnHistory}
              getTokenTransactionHistory={getTokenTransactionHistory}
            />
          )}
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
    borderColor: "#fff",
    height: 250,
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
