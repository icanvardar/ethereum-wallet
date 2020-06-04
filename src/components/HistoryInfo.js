import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { WalletContext } from "../context/WalletProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { utils } from "ethers";
import { timeDifference } from "../helper/timeManipulations";
import { addressShortener } from "../helper/addressShortener";

const HistoryInfo = (props) => {
  // console.log(props.token.tokenInfo.address)
  const [selectedOption, setSelectedOption] = useState("eth");

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
    if (props.fetchable && props.ethTxnHistory === null) {
      props.getEthereumTransactionHistory();
    }
  }, [props.fetchable]);

  useEffect(() => {
    if (
      props.fetchable &&
      props.tokenTxnHistory === null &&
      selectedOption === "token"
    ) {
      props.getTokenTransactionHistory();
    }
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.selectionView,
          { borderBottomColor: currentAccountColor },
        ]}
      >
        <TouchableOpacity onPress={() => setSelectedOption("eth")}>
          <View style={styles.selectionLeftView}>
            <Text
              style={[
                styles.selectionText,
                { color: currentAccountColor },
                selectedOption === "eth" && { fontFamily: "BalsamiqBold" },
              ]}
            >
              Ethereum
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("token")}>
          <View style={styles.selectionRightView}>
            <Text
              style={[
                styles.selectionText,
                { color: currentAccountColor },
                selectedOption === "token" && { fontFamily: "BalsamiqBold" },
              ]}
            >
              Token
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {selectedOption === "eth" ? (
        <>
          {props.ethTxnHistory === null &&
            (
              <View style={styles.spinnerView}>
                <ActivityIndicator size="large" color={currentAccountColor} />
              </View>
            )
          }
          {props.ethTxnHistory &&
            props.ethTxnHistory.map((txn) => (
              <View key={txn.hash} style={styles.ethHistoryView}>
                <View>
                  <Text style={styles.ethHistoryText}>
                    {addressShortener(txn.from)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.ethHistoryText}>
                    {utils.formatEther(txn.value)} ETH
                  </Text>
                </View>
                <View>
                  <Text style={styles.ethHistoryText}>
                    {timeDifference(parseInt(txn.timeStamp))}
                  </Text>
                </View>
              </View>
            ))}
          {props.ethTxnHistory && (
            <View style={styles.ethHistoryButtomButtonsView}>
              <Text>View All</Text>
              <Text>Refresh</Text>
            </View>
          )}
        </>
      ) : (
        <Text>
          TOKEN TXN HISTORY{" "}
          {props.tokenTxnHistory === null ? "Loading..." : "Loaded!"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  selectionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginHorizontal: 40,
    paddingBottom: 10,
  },
  selectionLeftView: { paddingRight: 20 },
  selectionRightView: { paddingLeft: 20 },
  selectionText: {
    fontFamily: "Balsamiq",
    fontSize: 20,
  },
  ethHistoryView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  ethHistoryText: { fontFamily: "Balsamiq" },
  ethHistoryButtomButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginTop: 5,
  },
  spinnerView: {flex: 1,justifyContent: "center", alignItems: "center", marginBottom: 50}
});

export default HistoryInfo;
