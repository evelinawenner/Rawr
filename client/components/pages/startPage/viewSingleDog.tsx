import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../../../../App";
import { ViewDogs } from "./viewDogs";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { LanguageContext } from "../../globals/context/languageContext/LanguageContext";
import styled from "styled-components";

type Props = NativeStackScreenProps<RootStackParamList, "SingleDog">;

export const ViewSingleDog: React.FC<Props> = ({ route }) => {
  const context = useContext(LanguageContext);
  const currUser = auth.currentUser;
  const navigation = useNavigation();
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogWeight, setDogWeight] = useState("");
  const [theDate, setTheDate] = useState("");
  const [dates, setDates] = useState<any[]>([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editDogBreed, setEditDogBreed] = useState("");
  const [editDogWeight, setEditDogWeight] = useState("");

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

  const updateDog = async () => {
    if (!currUser) return;
    const dogDoc = doc(db, "users", currUser.uid, "dogs", id);
    const newFields = { breed: dogBreed, weight: dogWeight };
    await updateDoc(dogDoc, newFields);
  };

  const addDate = async () => {
    if (!currUser) return;
    const dateRef = collection(db, "users", currUser.uid, "dogs", id, "dates");

    await addDoc(dateRef, { date: theDate });
    console.log("date", theDate, "added");
  };

  const deleteDog = async () => {
    if (!currUser) return;
    const dogDoc = doc(db, "users", currUser.uid, "dogs", id);
    await deleteDoc(dogDoc);
    navigation.goBack();
  };

  useEffect(() => {
    if (!currUser) return;
    onSnapshot(
      collection(db, "users", currUser.uid, "dogs", id, "dates"),
      //   (snapshot) => console.log(snapshot.docs.map((doc) => doc.data()))

      (snapshot) =>
        setDates(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  useEffect(() => {
    getDog();
  }, []);

  const handleShowUpdate = () => {
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setDogBreed(editDogBreed);
    setDogWeight(editDogWeight);
    updateDog();
    setShowUpdate(false);
  };

  const ShowUpdate = () => {
    if (showUpdate === false) {
      return (
        <TouchableOpacity onPress={handleShowUpdate}>
          <Text>Ändra</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <KeyboardAvoidingView>
          <TextInput
            placeholder="breed"
            value={editDogBreed}
            onChangeText={(text) => setEditDogBreed(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="weight"
            value={editDogWeight}
            onChangeText={(text) => setEditDogWeight(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleCloseUpdate}>
            <Text>Spara</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{dogName}</Text>
        <Text>
          breed: {dogBreed}, weight: {dogWeight}g
        </Text>
        <ShowUpdate />
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateHeading}>Datum</Text>
        <StyledUl>
          {dates.map((date) => (
            <li key={date.id}>
              <TouchableOpacity
                style={styles.dateListItems}
                onPress={() =>
                  navigation.navigate("SingleDate", { id: date.id })
                }
              >
                <Text style={styles.dateText}>{date.date}</Text>
              </TouchableOpacity>
            </li>
          ))}
        </StyledUl>
      </View>

      <View style={styles.addDateContainer}>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <TextInput
            placeholder="yy-mm-dd"
            value={theDate}
            onChangeText={(text) => setTheDate(text)}
            style={styles.input}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addDate}>
            <Text style={styles.buttonText}>
              {context.language.language.AddDate}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteDog}>
          <Text style={styles.buttonText}>Ta bort hund</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
  },

  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontSize: 50,
    fontFamily: "Dongle_700Bold",
  },

  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },

  dateHeading: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
  },

  dateListItems: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ef9458",
    borderRadius: 5,
  },

  dateText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
  },

  addDateContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  inputContainer: {
    width: "35%",
    marginRight: 5,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  addButtonContainer: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#0782F9",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonContainer: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  deleteButton: {
    backgroundColor: "#e06666",
    width: 140,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },
});

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
