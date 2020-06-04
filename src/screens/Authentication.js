import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default Authorization = ({ navigation }) => {
  // useEffect(() => {
  //   AsyncStorage.getItem("password")
  //     .then((data) => {
  //       console.log(data);
  //       return AsyncStorage.getItem("wallet");
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const wallet  = JSON.parse(data);
  //       console.log(wallet);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#9147FF", "transparent"]}
        style={styles.linearGradient}
      />
      <View style={styles.headingView}>
        <Text style={styles.heading1}>GET</Text>
        <Text style={styles.heading2}>STARTED</Text>
      </View>
      <View style={styles.cardsContainer}>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("ImportWallet")}
        >
          <View style={styles.informativeCard1}>
            <Text style={styles.cardHeading1}>Import Wallet</Text>
            <Text style={styles.cardText1}>
              You've already got wallet? Import your wallet by using private key
              or pass phrases!
            </Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={() => navigation.navigate("CreateWallet")}
        >
          <View style={styles.informativeCard2}>
            <Text style={styles.cardHeading2}>Create Wallet</Text>
            <Text style={styles.cardText2}>
              You don't have a wallet, yet? Set up your first wallet, instantly!
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  informativeCard1: {
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#fff",
    height: 140,
    width: width / 1.2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 25,
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
  informativeCard2: {
    justifyContent: "center",
    backgroundColor: "#9147FF",
    borderColor: "#fff",
    height: 140,
    width: width / 1.2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 25,
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
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height,
  },
  headingView: {
    paddingLeft: width / 10,
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
  },
  heading1: {
    fontFamily: "Monoton",
    fontSize: 40,
    color: "white",
  },
  heading2: {
    fontFamily: "Monoton",
    fontSize: 40,
    marginTop: -10,
    marginBottom: 30,
    color: "white",
  },
  cardsContainer: {
    paddingTop: height / 25,
    alignItems: "center",
  },
  cardHeading1: {
    fontFamily: "BalsamiqBold",
    fontSize: 30,
    marginBottom: 10,
    color: "#9147FF",
  },
  cardHeading2: {
    fontFamily: "BalsamiqBold",
    fontSize: 30,
    marginBottom: 10,
    color: "white",
  },
  cardText1: {
    fontFamily: "Balsamiq",
    color: "#9147FF",
  },
  cardText2: {
    fontFamily: "Balsamiq",
    color: "white",
  },
});
