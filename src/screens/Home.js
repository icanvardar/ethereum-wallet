import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import AccountCard from "../components/AccountCard";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const addresses = [
  "0xsdolksafok32ıdjfaıofjsf",
  "0xasdıjofıeowjewıfjmaıo",
  "0xspdokfowepkopwkewşf",
];

export default Home = () => {
  let listRef = useRef(null);

  const directListItems = (index) => {
    listRef.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardHeading}>My Wallet</Text>
      <FlatList
        data={addresses}
        renderItem={({ item, index }) => (
          <AccountCard
            length={addresses.length}
            index={index}
            directListItems={directListItems}
            item={item}
          />
        )}
        keyExtractor={(item) => item}
        horizontal={true}
        ref={(ref) => (listRef = ref)}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  cardHeading: {
    textShadowColor: "rgba(0.75, 0.75, 0.75, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 10,
    paddingLeft: 25,
  },
});
