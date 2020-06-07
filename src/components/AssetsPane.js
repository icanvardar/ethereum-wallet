import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { WalletContext } from "../context/WalletProvider";
import axios from "axios";
import { utils } from "ethers";
const { height, width } = Dimensions.get("window");

const AssetsPane = (props) => {
  const [eth, setETH] = useState(null);
  const [tokens, setTokens] = useState(null);

  const getTokenInfo = () => {
    axios
      .get(
        "https://api.ethplorer.io/getAddressInfo/0xea3a46BD1dbd0620d80037f70d0bF7c7dc5a837C?apiKey=freekey"
      )
      .then((data) => {
        setETH(data.data.ETH);
        setTokens(data.data.tokens);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTokenInfo();
  }, []);

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
    <View style={{ justifyContent: "center" }}>
      <View
        style={[
          styles.assetsCard,
          props.isOpen ? { height: 250 } : { height: 125 },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              flex: 1,
              paddingTop: 20,
              fontSize: 24,
              fontFamily: "BalsamiqBold",
              color: currentAccountColor,
            }}
          >
            Asset
          </Text>
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {props.isOpen ? (
              <Ionicons
                name="ios-arrow-up"
                size={24}
                color={currentAccountColor}
              />
            ) : (
              <Ionicons
                name="ios-arrow-down"
                size={24}
                color={currentAccountColor}
              />
            )}
          </View>
        </View>
        {props.isOpen ? (
          <FlatList
            data={tokens}
            renderItem={({ item, index }) => <Text>{item.tokenInfo.name} - {item.balance.toFixed()}</Text>}
            keyExtractor={(item) => item.tokenInfo.address}
          />
        ) : (
          <TouchableWithoutFeedback onPress={() => props.setIsOpen(true)}>
            <Text>Tokens are here</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  assetsCard: {
    backgroundColor: "white",
    borderColor: "#fff",
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
});

export default AssetsPane;
