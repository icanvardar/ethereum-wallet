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
import { Ionicons } from "@expo/vector-icons";
import makeBlockie from "ethereum-blockies-base64";

import { WalletContext } from "../context/WalletProvider";

const { height, width } = Dimensions.get("window");

export default AccountCard = (props) => {
  const [base64Blockie, setBase64Blockie] = useState(null);
  const {
    wallet,
    accountCount,
    addNewAccount,
    isNewAccount,
    currentAccount,
    setCurrentAccount,
  } = useContext(WalletContext);

  const goForward = () => {
    if (props.length !== props.index + 1) {
      props.directListItems(props.index + 1);
      setCurrentAccount(currentAccount + 1);
    } else {
      props.directListItemsToEnd();
    }
  };

  const goBackward = () => {
    props.directListItems(props.index - 1);
    setCurrentAccount(currentAccount - 1);
  };

  useEffect(() => {
    if (base64Blockie === null && props.item) {
      setBase64Blockie(makeBlockie(props.item.address));
    }
  }, [props.item]);

  return (
    <ImageBackground
      style={styles.balanceCard}
      imageStyle={styles.cardBackgroundImage}
      source={{ uri: "https://gradientjoy.com/300x400?id=31" + props.index }}
    >
      <View style={styles.container}>
        {props.isAccountAdder !== true ? (
          <>
            <View style={styles.cardLeftSide}>
              {props.index !== 0 && (
                <TouchableOpacity onPress={goBackward}>
                  <Ionicons name="ios-arrow-back" size={36} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cardMiddleSide}>
              <Text>{props.item.address}</Text>
              <Text>{props.accountName}</Text>
              {base64Blockie !== null && (
                <Image
                  source={{
                    uri: `data:image/png;base64,${base64Blockie}`,
                  }}
                  style={{ height: 50, width: 50 }}
                />
              )}
            </View>
            <View style={styles.cardRightSide}>
              <TouchableOpacity onPress={goForward}>
                <Ionicons name="ios-arrow-forward" size={36} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.cardLeftSide}>
              {props.index !== 0 && (
                <TouchableOpacity
                  onPress={() => props.directListItems(props.length - 1)}
                >
                  <Ionicons name="ios-arrow-back" size={36} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cardMiddleSide}>
              <TouchableOpacity
                onPress={() => {
                  addNewAccount();
                  setCurrentAccount(currentAccount + 1);
                }}
              >
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
    </ImageBackground>
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
    borderRadius: 20,
    marginHorizontal: 10,
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
  cardBackgroundImage: {
    borderRadius: 20,
  },
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
