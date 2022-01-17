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

  // useEffect(() => {
  //   printDogs();
  // }, [setDog]);

  // const printDogs = () => {
  //   axios
  //     .get<IDog[]>("http://localhost:1337/api/dogs")
  //     .then((res) => {
  //       setDog(res.data);
  //       console.log("hej" + res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
        <Text>Rawr</Text>
        <Text>Email: {auth.currentUser?.email}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          placeholder="name"
          value={dogName}
          onChangeText={(text) => setDogName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="breed"
          value={dogBreed}
          onChangeText={(text) => setDogBreed(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="weight"
          value={dogWeight}
          onChangeText={(text) => setDogWeight(text)}
          style={styles.input}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addDog}>
          <Text style={styles.buttonText}>Add dog</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ViewDogs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },

  button: {
    backgroundColor: "#0782F9",
    width: "25",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
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
