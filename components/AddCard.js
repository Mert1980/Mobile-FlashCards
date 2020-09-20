import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { white, blue } from "../utils/colors";

export default function DeckList() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const navigation = useNavigation();
  const createDeck = () => {
    navigation.navigate("Deck", { deckId: value, defaultLength: 0 });
  };
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
          placeholder="Question"
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
          onChangeText={(text) => setValue(text)}
          value={answer}
          placeholder="Answer"
          clearButtonMode="always"
        />
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={createDeck}>
          <Text style={styles.text}>Create Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
