import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDeck } from "../actions/index";
import { saveDeckTitle } from "../utils/api";
import { white, blue } from "../utils/colors";

export const AddDeck = (props) => {
  const [value, setValue] = useState("");
  const navigation = useNavigation();

  const createDeck = () => {
    props.addDeck(value);
    saveDeckTitle(value);

    navigation.navigate("Deck", { deckId: value, defaultLength: 0 });
    setValue("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={[styles.text, { color: blue }]}>
          What is the title of your new deck?
        </Text>
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
          value={value}
          autoCapitalize="words"
          placeholder="Deck Title"
          clearButtonMode="always"
        />
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={createDeck}>
          <Text style={styles.text}>Create Deck</Text>
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

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { addDeck })(AddDeck);
