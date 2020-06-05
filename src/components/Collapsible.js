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
const { height, width } = Dimensions.get("window");

const HomeCollapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Text>Hello</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoView: {
    justifyContent: "center",
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
  infoViewLeft: {  },
  infoViewRight: {  alignItems: "flex-end" },
  infoViewText: {
    color: "white",
    fontFamily: "Balsamiq",
    paddingLeft: 20,
    fontSize: 20,
  },
  infoViewIcon: { paddingRight: 20, paddingTop: 5 },
});

export default HomeCollapsible;
