import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Clipboard,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { createWallet } from "../utils/walletOperations";

const { height, width } = Dimensions.get("window");

export default CreateWallet = () => {
  const [walletInstance, setWalletInstance] = useState(null);
  const [mnemonicCopied, setMnemonicCopied] = useState(false);

  // useEffect(() => {
  //   console.log(createWallet().mnemonic);
  //   console.log(createWallet().privateKey);
  //   setWalletInstance(createWallet());
  // }, []);

  // useEffect(() => {
  //   if (walletInstance !== null) {
  //     const storedWallet = {
  //       mnemonic: walletInstance.mnemonic,
  //       privateKey: walletInstance.privateKey,
  //     };

  //     AsyncStorage.setItem("wallet", JSON.stringify(storedWallet));
  //   }
  // }, [walletInstance]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["red", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height,
        }}
      />

      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 0.5,
        }}
      ></View>

      {walletInstance === null ? (
        <View style={styles.cardContainer}>
          <Text style={styles.screenInformation}>
            Your wallet is almost ready! Please provide a password to reach your
            wallet in secure way!
          </Text>

          <View style={styles.informativeCard}>
            {mnemonicCopied === false ? (
              <Feather
                style={styles.mnemonicCopy}
                onPress={() => {
                  Clipboard.setString("ismail");
                  setMnemonicCopied(true);
                }}
                name="copy"
                size={24}
                color="tomato"
              />
            ) : (
              <Text style={styles.mnemonicCopy}>Copied</Text>
            )}
            <Text style={styles.mnemonicText}>
              distance man demand spoon kangaroo hen chronic broccoli yellow
              jelly thank luggage
            </Text>
          </View>

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.passwordInput}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Repeat Password"
            style={[styles.passwordInput, { fontSize: 16 }]}
          />
          <TouchableNativeFeedback>
            <View style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.spinnerText}>
            This might take a few seconds...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
  },
  screenInformation: {
    fontFamily: "Balsamiq",
    fontSize: 18,
    color: "white",
    width: width / 1.2,
    marginVertical: 20,
  },
  spinnerContainer: { paddingTop: height / 5, alignItems: "center" },
  spinnerText: {
    fontFamily: "Balsamiq",
    fontSize: 12,
    color: "white",
    marginTop: 10,
  },
  mnemonicCopy: {
    textAlign: "right",
    marginTop: -20,
    color: "tomato",
    fontFamily: "Balsamiq",
  },
  cardContainer: {
    alignItems: "center",
  },
  informativeCard: {
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#fff",
    height: 200,
    width: width / 1.2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
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
  passwordInput: {
    backgroundColor: "white",
    borderColor: "#fff",
    height: 50,
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
    color: "tomato",
    fontFamily: "Balsamiq",
    fontSize: 16,
  },
  mnemonicText: {
    fontFamily: "BalsamiqBold",
    fontSize: 25,
    color: "tomato",
  },
  continueButton: {
    backgroundColor: "tomato",
    borderColor: "#fff",
    height: 50,
    width: width / 3,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
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
    color: "tomato",
    fontFamily: "Balsamiq",
    fontSize: 16,
  },
  continueButtonText: {
    fontFamily: "BalsamiqBold",
    fontSize: 16,
    color: "white",
  },
});
