import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  LanguageContextProvider,
  LanguageContext,
} from "./client/components/globals/context/languageContext/LanguageContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartPage } from "./client/components/pages/StartPage";
import { LoginPage } from "./client/components/pages/LoginPage";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type RootStackParamList = {
  Start: { userId: string };
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <LanguageContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Start"
            component={StartPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
