import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import { addressShortener } from "../helper/addressOperations";
import { WalletContext } from "../context/WalletProvider";

const { height, width } = Dimensions.get("window");

export default AccountCard = (props) => {
  const [base64Blockie, setBase64Blockie] = useState(null);
  const [ethBalance, setETHBalance] = useState(null);

  const {
    wallet,
    accountCount,
    addNewAccount,
    isNewAccount,
    currentAccountIndex,
    setCurrentAccountIndex,
    currentAccountColor,
  } = useContext(WalletContext);

  const goForward = () => {
    if (props.length !== props.index + 1) {
      props.directListItems(props.index + 1);
      setCurrentAccountIndex(currentAccountIndex + 1);
    } else {
      props.directListItemsToEnd();
    }
  };

  const goBackward = () => {
    props.directListItems(props.index - 1);
    setCurrentAccountIndex(currentAccountIndex - 1);
  };

  const createNewAccount = () => {
    addNewAccount();
    setCurrentAccountIndex(currentAccountIndex + 1);
  };

  const getETHBalance = () => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=balancemulti&address=${props.item.address}&tag=latest&apikey=V645J9EGC1UT8R1GB8MBAY3CZAAI7MADUP`
      )
      .then((data) => {
        console.log(data.data.result);
        setETHBalance(data.data.result[0].balance);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.item) {
      getETHBalance();
    }
  }, [props.item]);

  return (
    <View style={styles.balanceCard}>
      <View style={styles.container}>
        {props.isAccountAdder !== true ? (
          <View style={styles.cardView}>
            <View style={styles.cardTopView}>
              <View style={styles.cardLeftSide}>
                {props.index !== 0 && (
                  <TouchableOpacity onPress={goBackward}>
                    <Ionicons
                      name="ios-arrow-back"
                      size={36}
                      color={currentAccountColor}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.cardMiddleSide}>
                <View style={styles.cardAccountInfoView}>
                  <View>
                    <FontAwesome5
                      name="ethereum"
                      size={44}
                      color={currentAccountColor}
                    />
                  </View>
                  <View style={styles.cardAccountInfoViewRight}>
                    <View>
                      <Text
                        style={[styles.cardAccountName, { color: currentAccountColor }]}
                      >
                        {props.item.accountName}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[styles.cardAccountAddress, {color: currentAccountColor}]}
                      >
                        {addressShortener(props.item.address)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  {
                    ethBalance !== null ?
                    <Text style={[styles.cardBalanceSection, { color: currentAccountColor }]}>{ethBalance} ETH</Text>
                    :
                    <Text style={{color: currentAccountColor}}>Fetching balance...</Text>
                  }
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.cardButton,
                      { backgroundColor: currentAccountColor },
                    ]}
                  >
                      <MaterialIcons
                        name="call-received"
                        size={20}
                        color={"white"}
                      />
                  </View>
                  <View
                    style={[
                      styles.cardButton,
                      { backgroundColor: "white", marginLeft: 10 },
                    ]}
                  >
                      <MaterialIcons
                        name="call-made"
                        size={20}
                        color={currentAccountColor}
                      />
                  </View>
                </View>
              </View>
              <View style={styles.cardRightSide}>
                {props.index === currentAccountIndex && (
                  <TouchableOpacity onPress={goForward}>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={36}
                      color={currentAccountColor}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={[
                styles.cardBottomView,
                { backgroundColor: currentAccountColor },
              ]}
            />
          </View>
        ) : (
          <>
            <View style={styles.cardLeftSide}>
              {props.index !== 0 && (
                <TouchableOpacity
                  onPress={() => props.directListItems(props.length - 1)}
                >
                  <Ionicons
                    name="ios-arrow-back"
                    size={36}
                    color={currentAccountColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cardMiddleSide}>
              <TouchableOpacity onPress={() => createNewAccount()}>
                <Text>Add New Account</Text>
              </TouchableOpacity>
              <Text>{isNewAccount && <Text>Fetching...</Text>}</Text>
            </View>
            <View style={styles.cardRightSide}>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderColor: "#fff",
    height: 200,
    width: width / 1.2,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, 0.4)",
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  cardButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    height: 30,
    width: width / 4,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, 0.4)",
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  cardView: { flex: 1 },
  cardTopView: { flex: 15, flexDirection: "row" },
  cardBottomView: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: "100%",
    width: "100%",
    flex: 1,
  },
  cardAccountInfoView: { flexDirection: "row"},
  cardAccountInfoViewRight: {flexDirection: "column", paddingLeft: 10},
  cardAccountName: {
    fontFamily: "BalsamiqBold",
    fontSize: 18,
  },
  cardAccountAddress: {
    fontFamily: "Balsamiq",
    fontSize: 14
  },
  cardBalanceSection: {fontFamily: "BalsamiqBold", fontSize: 35},
  container: {
    flex: 1,
    flexDirection: "row",
  },
  cardLeftSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardMiddleSide: {
    flex: 4,
    justifyContent: "center",
  },
  cardRightSide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
