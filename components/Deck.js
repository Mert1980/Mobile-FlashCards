import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import DeckInfo from "./DeckInfo";
import { deleteDeck } from "../actions/index";
import { removeDeck } from "../utils/api";
import { white, blue, red } from "../utils/colors";

const InfoDelete = () => {
  return (
    <View style={styles.deleteInfoContainer}>
      <Text style={[styles.text, { color: red, fontSize: 34 }]}>
        Successfully Deleted!
      </Text>
    </View>
  );
};

export const Deck = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, defaultLength } = route.params;
  const data = props.decks;
  console.log("data in DeckJs ", data[deckId]);

  const startQuiz = () => {
    navigation.navigate("Quiz", {
      deckId: deckId,
      defaultLength: 0,
    });
  };

  function deleteDeck(key) {
    props.deleteDeck(key);
    removeDeck(key);
  }
  return data[deckId] === undefined ? (
    <InfoDelete />
  ) : (
    <View style={styles.container}>
      <DeckInfo
        title={deckId}
        questions={
          data[deckId].questions === [] ? defaultLength : data[deckId].questions
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
      <View style={styles.deleteButton}>
        <Button
          title={"Delete Deck"}
          color={red}
          onPress={() => deleteDeck(deckId)}
        />
      </View>
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
  deleteButton: {
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    marginLeft: 30,
    marginRight: 30,
    color: white,
    textAlign: "center",
  },
  deleteInfoContainer: {
    marginTop: "50%",
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { deleteDeck })(Deck);
