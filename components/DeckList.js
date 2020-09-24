import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import DeckInfo from "./DeckInfo";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";

export const DeckList = (props) => {
  useEffect(() => {
    props.handleInitialData();
  }, []);
  const data = props.decks;

  return (
    <ScrollView style={styles.decklist_container}>
      {Object.keys(data).map((title) => (
        <DeckInfo title={title} key={title} questions={data[title].questions} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  decklist_container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { handleInitialData })(DeckList);
