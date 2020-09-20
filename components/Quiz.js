import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Result from "./Result";
import { data } from "../utils/api";
import { black, blue, red, white, gray } from "../utils/colors";

export default function Deck(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, defaultLength } = route.params;

  const [onAnswer, setOnAnswer] = useState(false);
  const [counter, setCounter] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const length = data[deckId].questions.length;

  const handleAnswer = () => {
    if (counter < length) {
      setCounter(counter + 1);
    } else {
      setShowResult(true);
      console.log(showResult);
    }
  };

  const resetQuiz = () => {
    setCounter(1);
  };

  return showResult === true ? (
    <Result />
  ) : (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {counter}/{length}
        </Text>
      </View>
      <View>
        {!onAnswer ? (
          <Text style={[styles.text, { color: black, fontSize: 30 }]}>
            {data[deckId].questions[counter - 1].question}
          </Text>
        ) : (
          <Text style={[styles.text, { color: black, fontSize: 30 }]}>
            {data[deckId].questions[counter - 1].answer}!
          </Text>
        )}
      </View>
      <View>
        <Button
          title={!onAnswer ? "Answer" : "Question"}
          color={red}
          onPress={() => setOnAnswer(!onAnswer)}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleAnswer}>
          <Text style={styles.text}>Correct</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: red }]}
          onPress={handleAnswer}
        >
          <Text style={styles.text}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    alignSelf: "flex-start",
    marginBottom: "25%",
    paddingLeft: 25,
    paddingTop: 10,
  },
  counterText: {
    fontSize: 30,
    color: gray,
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
});
