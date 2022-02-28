import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { auth, db } from "../../../../firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { LanguageContext } from "../../globals/context/languageContext/LanguageContext";
import { ViewDogs } from "./viewDogs";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import AppLoading from "expo-app-loading";
import { LangSwitch } from "../../globals/langSwitch";

interface IDog {
  dogName: string;
  dogBreed: string;
  dogWeight: number;
  id: number;
}

export const StartPage = () => {
  const context = useContext(LanguageContext);
  const [dog, setDog] = useState<IDog[]>([]);
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogWeight, setDogWeight] = useState("");

  let [fontsLoaded] = useFonts({ Roboto_400Regular, Righteous_400Regular });

  const navigation = useNavigation();
  const currUser = auth.currentUser;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const addDog = async () => {
    if (!currUser) return;
    const dogRef = collection(db, "users", currUser.uid, "dogs");

    await addDoc(dogRef, { name: dogName, breed: dogBreed, weight: dogWeight });
    console.log("dog", dogName, "added");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <KeyboardAvoidingView style={styles.topContainer}>
          <Text style={styles.rawr}>{context.language.language.SiteTitle}</Text>

          <LangSwitch />

          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>
              {context.language.language.login_logout}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View>
          <ViewDogs />
        </View>
        <SafeAreaView style={styles.container}>
          <Text style={styles.addHeading}>
            {context.language.language.AddDog}
          </Text>
          <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput
              placeholder={context.language.language.name}
              value={dogName}
              onChangeText={(text) => setDogName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder={context.language.language.breed}
              value={dogBreed}
              onChangeText={(text) => setDogBreed(text)}
              style={styles.input}
            />
            <TextInput
              placeholder={context.language.language.weight}
              keyboardType={"numeric"}
              value={dogWeight}
              onChangeText={(text) => setDogWeight(text)}
              style={styles.input}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addDog}>
              <Text style={styles.buttonText}>
                {context.language.language.AddDog}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(239,	148,	88, 0.5)",
    marginTop: 20,
  },

  rawr: {
    fontFamily: "Righteous_400Regular",
    fontSize: 40,
    color: "#ef9458",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "baseline",
  },

  button: {
    backgroundColor: "#0782F9",
    width: 70,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },

  addHeading: {
    fontFamily: "Roboto_400Regular",
    fontSize: 30,
    marginVertical: 10,
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  addButtonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  addButton: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
