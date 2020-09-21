import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { black, blue, red, white, orange } from "../utils/colors";

const Separator = () => <View style={styles.separator} />;

export default function Result() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, countResult, length } = route.params;

  const restartQuiz = () => {
    navigation.navigate("Quiz", {
      deckId: deckId,
      defaultLength: 0,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, { color: black, fontSize: 30 }]}>
          Congratulations!
        </Text>
      </View>
      <Separator />
      <View>
        <Text style={[styles.text, { color: orange, fontSize: 24 }]}>
          You have answered {countResult} out of {length} questions correct!
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => restartQuiz()}>
          <Text style={styles.text}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: red }]}
          onPress={() => navigation.navigate("Deck", { deckId })}
        >
          <Text style={styles.text}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "25%",
  },

  button: {
    backgroundColor: blue,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 50,
    marginRight: 50,
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
  text: {
    fontSize: 24,
    marginLeft: 30,
    marginRight: 30,
    color: white,
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    marginBottom: 20,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
