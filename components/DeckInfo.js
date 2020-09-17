import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { white, gray } from "../utils/colors";

export default function DeckInfo(props) {
  return (
    <View style={styles.deckInfoContainer}>
      <TouchableOpacity style={styles.center}>
        <Text style={{ fontSize: 30 }}>{props.title}</Text>
        <Text style={{ fontSize: 24, color: gray }}>
          {props.questions.length} cards
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  deckInfoContainer: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});
