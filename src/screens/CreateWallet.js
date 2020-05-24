import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default CreateWallet = () => {
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
      <View style={{
        borderBottomColor: "white",
        borderBottomWidth: 0.5
      }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90
  },
});
