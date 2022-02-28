import React, { useEffect, useState, useContext } from "react";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import {
  TouchableOpacity,
  Text,
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { updateCurrentUser } from "@firebase/auth";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components";
import { LanguageContext } from "../../globals/context/languageContext/LanguageContext";
import { ScreenContainer } from "react-native-screens";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";

interface IDogs {}

export const ViewDogs = () => {
  const context = useContext(LanguageContext);
  const currUser = auth.currentUser;
  const navigation = useNavigation();
  const [dogs, setDogs] = useState<any[]>([]);

  //   console.log("hej" + dogs);

  useEffect(() => {
    if (!currUser) return;
    onSnapshot(
      collection(db, "users", currUser.uid, "dogs"),
      //   (snapshot) => console.log(snapshot.docs.map((doc) => doc.data()))

      (snapshot) =>
        setDogs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
  //   setDogs()

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{context.language.language.YourDogs}</Text>
      <StyledUl>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <TouchableOpacity
              style={styles.listItems}
              onPress={() => navigation.navigate("SingleDog", { id: dog.id })}
            >
              <Text style={styles.dogText}>{dog.name}</Text>
            </TouchableOpacity>
          </li>
        ))}
      </StyledUl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },

  heading: {
    fontSize: 30,
    fontFamily: "Roboto_400Regular",
    marginVertical: 10,
  },

  listItems: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ef9458",
    borderRadius: 5,
  },

  dogText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
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
