import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../../../firebase";
import { LanguageContext } from "../globals/context/languageContext/LanguageContext";

interface IDog {
  dogName: string;
  dogBreed: string;
  dogWeight: number;
  id: number;
}

export const StartPage = () => {
  const context = useContext(LanguageContext);
  const [dog, setDog] = useState<IDog[]>([]);

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
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
    <SafeAreaView style={styles.container}>
      <Text>Rawr</Text>
      <Text>Email: {auth.currentUser?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
