import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import { Provider } from "react-redux";
import { store } from "./src/services/redux/store";

import { Navigation } from "./src/infrastructure/navigation/index";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
  );
}
