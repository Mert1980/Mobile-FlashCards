import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import DeckInfo from "./DeckInfo";

import { white, blue } from "../utils/colors";

export const Deck = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, defaultLength } = route.params;
  const data = props.decks;

  const startQuiz = () => {
    navigation.navigate("Quiz", {
      deckId: deckId,
      defaultLength: 0,
    });
  };
  return (
    <View style={styles.container}>
      <DeckInfo
        title={deckId}
        questions={
          data[deckId].questions.length > 0
            ? data[deckId].questions
            : defaultLength
        }
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add Card", { deckId })}
      >
        <Text style={styles.text}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={startQuiz}>
        <Text style={styles.text}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  button: {
    backgroundColor: blue,
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
  text: {
    fontSize: 24,
    marginLeft: 30,
    marginRight: 30,
    color: white,
    textAlign: "center",
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Deck);
