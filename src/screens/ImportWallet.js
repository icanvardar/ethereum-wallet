import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default ImportWallet = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#9147FF", "transparent"]}
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
      <View style={styles.cardGroups}>
        <View style={styles.topCardGroup}>
          <Text style={styles.cardDescript}>
            Your wallet private key is needed for this option
          </Text>
          <View style={styles.informativeCard}>
            <Text style={styles.cardText}>Import entering private key</Text>
          </View>
        </View>

        <View style={styles.bottomCardGroup}>
          <Text style={styles.cardDescript}>
            Your 12-word seed phrase is needed for this option
          </Text>
          <View style={styles.informativeCard}>
            <Text style={styles.cardText}>Import entering seed phrase</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
  },
  cardGroups: {
    alignItems: "center",
    paddingTop: 20,
  },
  informativeCard: {
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#fff",
    height: 50,
    width: width / 1.4,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 15,
    alignItems: "center",
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
  cardText: {
    fontFamily: "BalsamiqBold",
    fontSize: 15,
    color: "#9147FF",
  },
  cardDescript: {
    fontFamily: "BalsamiqBold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    width: width / 1.4,
    marginVertical: 5,
  },
  topCardGroup: {},
  bottomCardGroup: {
    marginTop: 30,
    paddingTop: 20,
    borderTopColor: "white",
    borderTopWidth: 0.5,
  },
});
