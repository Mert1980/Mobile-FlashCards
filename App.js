import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Platform } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import { orange, white } from "./utils/colors";

function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = () => (
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
      header: null,
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

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Deck"
      component={Deck}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <FlashStatusBar backgroundColor={orange} barStyle="light-content" />
        <MainNav />
      </NavigationContainer>
    </View>
  );
}
