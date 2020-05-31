import React, { useState, useEffect, useContext } from "react";
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
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import AuthenticationProvider, {
  AuthenticationContext,
} from "../context/AuthenticationProvider";
const { ethers } = require('ethers');

const { height, width } = Dimensions.get("window");

export default CreateWallet = () => {
  const [walletInstance, setWalletInstance] = useState(null);
  const [mnemonicCopied, setMnemonicCopied] = useState(false);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { login } = useContext(AuthenticationContext);

  useEffect(() => {
    const createdWallet = ethers.Wallet.createRandom();
    console.log(createdWallet.mnemonic);
    setWalletInstance(createdWallet);
  }, []);

  useEffect(() => {
    if (password !== null) {
      if (password.length < 4) {
        setErrorMessage("Password must be at least 4 character!");
        setButtonDisabled(true);
      }
      else if (password !== repeatPassword) {
        setErrorMessage("Passwords not matched!");
        setButtonDisabled(true);
      } else {
        setErrorMessage(null);
        setButtonDisabled(false);
      }
    }
  }, [password, repeatPassword])

  const setWallet = async () => {
    await AsyncStorage.setItem("password", password);
    let storedWalletData = {
      accounts: [
        {
          address: walletInstance.signingKey.address,
          accountName: "Account 1"
        }
      ],
      accountsCount: 0,
      privateKey: walletInstance.signingKey.privateKey,
      mnemonic: walletInstance.signingKey.mnemonic,
      path: walletInstance.signingKey.path
    }
    await AsyncStorage.setItem("wallet", JSON.stringify(storedWalletData));
    login();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
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

      {walletInstance !== null ? (
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
              {walletInstance.mnemonic}
            </Text>
          </View>

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.passwordInput}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Repeat Password"
            style={styles.passwordInput}
            onChangeText={text => setRepeatPassword(text)}
          />
          {
            errorMessage !== null &&
            <Text style={styles.errorMessageText}>{errorMessage}</Text>
          }
          <TouchableNativeFeedback disabled={buttonDisabled} onPress={setWallet}>
            <View style={buttonDisabled ? styles.continueButtonDisabled : styles.continueButton}>
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
    </KeyboardAvoidingView>
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
  continueButtonDisabled: {
    backgroundColor: "tomato",
    opacity: 0.6,
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
  errorMessageText: {
    fontFamily: "BalsamiqBold",
    fontSize: 16,
    color: "tomato",
  },
});
