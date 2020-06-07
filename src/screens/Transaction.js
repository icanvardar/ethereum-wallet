import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { WalletContext } from "../context/WalletProvider";
import { addressShortener, addressEditor } from "../helper/addressOperations";
import QRScanner from "../components/QRScanner";
import AssetsPane from "../components/AssetsPane";
import { utils } from "ethers";

export default Transaction = () => {
  const [scanned, setScanned] = useState(false);
  const [qrScannerOpen, setQRScannerOpen] = useState(false);
  const [recepientAddress, setRecepientAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);

  useEffect(() => {
    if (recepientAddress !== null) {
      const address = addressEditor(recepientAddress);
      try {
        utils.getAddress(address);
        setRecepientAddress(address);
        setAddressError(null);
      } catch (err) {
        setAddressError("Incorrect address, please try again!");
      }
    }
  }, [recepientAddress]);

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
          <QRScanner
            setData={setRecepientAddress}
            scanned={scanned}
            setScanned={setScanned}
            setQRScannerOpen={setQRScannerOpen}
          />
        </>
      ) : (
        <>
          <AssetsPane isOpen={isAssetsOpen} setIsOpen={setIsAssetsOpen}/>
          {!recepientAddress ? (
            <View style={styles.qrSection}>
              <View style={{ marginLeft: 30 }}>
                <TouchableOpacity
                  onPress={() => {
                    setQRScannerOpen(true);
                    setScanned(false);
                  }}
                >
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={52}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 20, flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Balsamiq",
                    color: currentAccountColor,
                    fontSize: 18,
                  }}
                >
                  Please press QR icon to scan recepient address.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.input}>
              <Text
                style={{
                  flex: 8,
                  fontFamily: "Balsamiq",
                  color: currentAccountColor,
                  fontSize: 20,
                }}
              >
                {addressShortener(recepientAddress)}
              </Text>
              <TouchableOpacity
                onPress={() => setRecepientAddress(null)}
                style={{ flex: 1 }}
              >
                <Entypo name="cross" size={24} color={currentAccountColor} />
              </TouchableOpacity>
            </View>
          )}
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
            <TouchableOpacity>
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
          {addressError && (
            <Text
              style={{ color: "red", fontFamily: "Balsamiq", fontSize: 20 }}
            >
              {addressError}
            </Text>
          )}
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  qrSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#fff",
    height: 100,
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
