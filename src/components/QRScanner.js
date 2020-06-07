import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { WalletContext } from "../context/WalletProvider";

const { height, width } = Dimensions.get("window");

const QRScanner = (props) => {
    const [hasPermission, setHasPermission] = useState(null);

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
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        props.setScanned(true);
        props.setQRScannerOpen(false);
        props.setData(data);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
    return (
        <View>
             <BarCodeScanner
                onBarCodeScanned={props.scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                style={{ height: height / 1.5, width: width }}
            />
            <View style={{alignItems: "center", justifyContent: "center", paddingTop: 25}}>
                <Text style={{color: currentAccountColor, fontFamily: "BalsamiqBold", fontSize: 16}}>Please scan address' QR Code!</Text>
            </View>
        </View>
    )
}

export default QRScanner;