import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import logger from "./middleware/logger";
import reducer from "./reducers";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { orange, white } from "./utils/colors";
import { setLocalNotification } from "./utils/helpers";

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Decks";
  switch (routeName) {
    case "Decks":
      return "Decks";
    case "Add Deck":
      return "Add Deck";
  }
}
const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);
  return (
    <Tabs.Navigator
      initialRouteName="Decks"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Decks") {
            icon = <FontAwesome name="list-alt" size={size} color={color} />;
          } else if (route.name === "Add Deck") {
            icon = <FontAwesome name="plus-square" size={size} color={color} />;
          }
          return icon;
        },
      })}
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? orange : white,
        showIcon: true,
        style: {
          height: 80,
          backgroundColor: Platform.OS === "ios" ? white : orange,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tabs.Screen name="Decks" component={DeckList} />
      <Tabs.Screen name="Add Deck" component={AddDeck} />
    </Tabs.Navigator>
  );
};

const Stack = createStackNavigator();

const MainNav = (props) => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
      })}
    />
    <Stack.Screen
      name="Deck"
      component={Deck}
      options={({ route }) => ({
        headerTitle: route.params.deckId,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
      })}
    />
    <Stack.Screen
      name="Add Card"
      component={AddCard}
      options={() => ({
        headerTitle: null,
      })}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={() => ({
        headerTitle: null,
      })}
    />
    <Stack.Screen
      name="Result"
      component={Result}
      options={() => ({
        headerTitle: null,
      })}
    />
    <Stack.Screen
      name="DeckList"
      component={DeckList}
      options={() => ({
        headerTitle: null,
      })}
    />
  </Stack.Navigator>
);

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <FlashStatusBar backgroundColor={orange} barStyle="light-content" />
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
