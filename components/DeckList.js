import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DeckInfo from "./DeckInfo";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";

export const DeckList = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  const data = props.decks;
  return (
    <View style={styles.decklist_container}>
      {Object.keys(data).map((title) => (
        <DeckInfo title={title} key={title} questions={data[title].questions} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  decklist_container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "flex-start",
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
