import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

export default AccountCard = (props) => {

  return (
    <ImageBackground
      style={styles.balanceCard}
      imageStyle={styles.cardBackgroundImage}
      source={{uri: "https://gradientjoy.com/300x400?id=31" + props.index}}
    >
      {props.index !== 0 && (
        <TouchableOpacity
          onPress={() => props.directListItems(props.index - 1)}
        >
          <Text>Backward</Text>
        </TouchableOpacity>
      )}
      <Text style={{ color: "white", fontWeight: "bold" }}>{props.item}</Text>
      {props.length !== props.index + 1 && (
        <TouchableOpacity
          onPress={() => props.directListItems(props.index + 1)}
        >
          <Text>Forward</Text>
        </TouchableOpacity>
      )}
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
});
