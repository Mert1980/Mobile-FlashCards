import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { white, blue } from "../utils/colors";
import { addCard } from "../actions/index";
import { addCardToDeck } from "../utils/api";

export const AddCard = (props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  function createCard(title) {
    props.addCard(title, {
      question: question,
      answer: answer === "True" ? true : false,
    });
    addCardToDeck(title, {
      question: question,
      answer: answer === "True" ? true : false,
    });
    navigation.navigate("Deck", {
      deckId: route.params.deckId,
      defaultLength: 0,
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(text) => setQuestion(text)}
          value={question}
          placeholder="Question - statement"
          clearButtonMode="always"
        />
      </View>

      <View style={styles.subContainer}>
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(text) => setAnswer(text)}
          value={answer}
          placeholder="Answer - true or false"
          clearButtonMode="always"
        />
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createCard(route.params.deckId)}
        >
          <Text style={styles.text}>Create Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "40%",
    alignContent: "space-between",
    alignItems: "center",
  },
  subContainer: {
    margin: 20,
  },
  text: {
    fontSize: 24,
    marginLeft: 30,
    marginRight: 30,
    color: white,
    textAlign: "center",
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
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps, { addCard })(AddCard);
