import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { ViewDogs } from "./viewDogs";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";

type Props = NativeStackScreenProps<RootStackParamList, "SingleDog">;

export const ViewSingleDog: React.FC<Props> = ({ route }) => {
  const currUser = auth.currentUser;
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogWeight, setDogWeight] = useState(0);

  const { id } = route.params;

  const getDog = async () => {
    if (!currUser) return;
    const docRef = doc(db, "users", currUser.uid, "dogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setDogName(docSnap.data().name);
      setDogBreed(docSnap.data().breed);
      setDogWeight(docSnap.data().weight);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView></KeyboardAvoidingView>
      <Text style={styles.heading}>{dogName}</Text>
      <Text>weight: {dogWeight}g</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  heading: {
    marginTop: 15,
    fontSize: 40,
  },
});
