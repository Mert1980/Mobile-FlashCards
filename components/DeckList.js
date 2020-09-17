import React from "react";
import { View, StyleSheet } from "react-native";
import { data } from "../utils/api";
import DeckInfo from "./DeckInfo";

export default function DeckList() {
  return (
    <View style={styles.decklist_container}>
      {Object.keys(data).map((title) => (
        <DeckInfo title={title} key={title} questions={data[title].questions} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  decklist_container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "flex-start",
  },
});
