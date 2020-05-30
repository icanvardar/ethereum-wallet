import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default AccountCard = (props) => {
  return (
    <ImageBackground
      style={styles.balanceCard}
      imageStyle={styles.cardBackgroundImage}
      source={{ uri: "https://gradientjoy.com/300x400?id=31" + props.index }}
    >
      <View style={styles.container}>
        <View style={styles.cardLeftSide}>
          {props.index !== 0 && (
            <TouchableOpacity
              onPress={() => props.directListItems(props.index - 1)}
            >
              <Ionicons name="ios-arrow-back" size={36} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardMiddleSide}>
          <Text>Hello</Text>
        </View>
        <View style={styles.cardRightSide}>
          {props.length !== props.index + 1 && (
            <TouchableOpacity
              onPress={() => props.directListItems(props.index + 1)}
            >
              <Ionicons name="ios-arrow-forward" size={36} color="white" />
            </TouchableOpacity>
          )}
        </View>
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
