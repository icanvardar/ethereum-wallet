import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
const { height, width } = Dimensions.get("window");
import { WalletContext } from "../context/WalletProvider";
import { addressShortener } from "../helper/addressShortener";

export default Transaction = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrScannerOpen, setQRScannerOpen] = useState(false);
  const [recepientAddress, setRecepientAddress] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQRScannerOpen(false);
    setRecepientAddress(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
    <View style={styles.container}>
      {qrScannerOpen ? (
        <>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          style={{ height: height / 1.5, width: width }}
        />
        <View style={{alignItems: "center", justifyContent: "center", paddingTop: 25}}>
            <Text style={{color: currentAccountColor, fontFamily: "BalsamiqBold", fontSize: 16}}>Please scan address' QR Code!</Text>
        </View>
        </>
      ) : (
        <>
          <View style={{ justifyContent: "center" }}>
            <View style={styles.assetsCard}>
              <Text
                style={{
                  paddingTop: 20,
                  fontSize: 24,
                  fontFamily: "BalsamiqBold",
                  color: currentAccountColor,
                }}
              >
                Asset
              </Text>
              <View>
                <FontAwesome5 name="ethereum" size={24} color="black" />
              </View>
            </View>
          </View>
          <View style={styles.input}>
            <TextInput
              style={{
                flex: 6,
                color: currentAccountColor,
                fontFamily: "Balsamiq",
                fontSize: 20,
              }}
              placeholder="Recipient Address"
              onChangeText={text => setRecepientAddress(text)}
              value={addressShortener(recepientAddress)}
            />
            <TouchableOpacity
            style={{ flex: 1 }}
              onPress={() => {
                setQRScannerOpen(true);
                setScanned(false);
              }}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={32}
                color={currentAccountColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TextInput
              style={{
                flex: 6,
                color: currentAccountColor,
                fontFamily: "Balsamiq",
                fontSize: 20,
              }}
              placeholder="Amount"
              keyboardType="number-pad"
            />
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                style={{
                  color: currentAccountColor,
                  fontFamily: "Balsamiq",
                  fontSize: 20,
                }}
              >
                Max
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: currentAccountColor },
            ]}
          >
            <Text
              style={{ color: "white", fontFamily: "Balsamiq", fontSize: 25 }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "aliceblue",
    alignItems: "center",
  },
  assetsCard: {
    backgroundColor: "white",
    borderColor: "#fff",
    height: 150,
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
    color: "#9147FF",
    fontFamily: "Balsamiq",
    fontSize: 16,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderColor: "#fff",
    height: 50,
    width: width / 1.2,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
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
  sendButton: {
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: width / 1.5,
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
});
