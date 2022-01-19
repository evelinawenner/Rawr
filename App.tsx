import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  LanguageContextProvider,
  LanguageContext,
} from "./client/components/globals/context/languageContext/LanguageContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartPage } from "./client/components/pages/startPage/StartPage";
import { LoginPage } from "./client/components/pages/LoginPage";
import { ViewSingleDog } from "./client/components/pages/startPage/viewSingleDog";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Start: { userId: string };
  Login: undefined;
  SingleDog: {
    id: string;
  };
  SingleDate: {
    id: string;
  };
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="SingleDog"
            component={ViewSingleDog}
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
