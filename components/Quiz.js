import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { black, blue, red, white, gray } from "../utils/colors";

export const Quiz = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId } = route.params;
  const [onAnswer, setOnAnswer] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [countResult, setCountResult] = useState(0);
  const data = props.decks;
  const length = data[deckId].questions.length;

  const isEmpty = data[deckId].questions.length === 0 ? true : false;

  const handleCorrect = () => {
    if (data[deckId].questions[counter].answer) {
      setCountResult(countResult + 1);
    }
    if (counter === length - 1) {
      setShowResult(true);
    }
    if (counter < length - 1) {
      setCounter(counter + 1);
    }
  };

  const handleIncorrect = () => {
    if (!data[deckId].questions[counter].answer) {
      setCountResult(countResult + 1);
    }
    if (counter === length - 1) {
      setShowResult(true);
    }
    if (counter < length - 1) {
      setCounter(counter + 1);
    }
  };

  useEffect(() => {
    if (showResult) {
      setCounter(0);
      setCountResult(0);
      setShowResult(false);
      navigation.navigate("Result", {
        countResult,
        length,
        deckId,
      });
    }
  }, [showResult]);

  return !isEmpty ? (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {counter + 1}/{length}
        </Text>
      </View>
      <View>
        {!onAnswer ? (
          <Text style={[styles.text, { color: black, fontSize: 30 }]}>
            {
              data[deckId].questions[
                counter - 1 < 0 ? 0 : counter === length ? counter - 1 : counter
              ].question
            }
          </Text>
        ) : (
          <Text style={[styles.text, { color: black, fontSize: 30 }]}>
            {data[deckId].questions[
              counter - 1 < 0 ? 0 : counter === length ? counter - 1 : counter
            ].answer
              ? "Yes"
              : "No"}
            !
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
        <TouchableOpacity style={styles.button} onPress={handleCorrect}>
          <Text style={styles.text}>Correct</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: red }]}
          onPress={handleIncorrect}
        >
          <Text style={styles.text}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.center}>
      <Text style={styles.textInfo}>
        Sorry! You can't start quiz before adding cards to the deck.
      </Text>
    </View>
  );
};

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
  textInfo: {
    fontSize: 40,
    marginLeft: 30,
    marginRight: 30,
    color: black,
    textAlign: "center",
  },
  center: {
    marginTop: "35%",
    alignItems: "center",
  },
});
function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(Quiz);
