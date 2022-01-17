import React, { useEffect, useState } from "react";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import { updateCurrentUser } from "@firebase/auth";
import { useNavigation } from "@react-navigation/core";

interface IDogs {}

export const ViewDogs = () => {
  const currUser = auth.currentUser;
  const navigation = useNavigation();
  const [dogs, setDogs] = useState<any[]>([]);

  //   console.log("hej" + dogs);

  const getDogs = async () => {
    //     if (!currUser) return;
    //     const querySnapshot = await getDocs(
    //       collection(db, "users", currUser.uid, "dogs")
    //     );
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     //   let dog: IDogs = {
    //     //     name: doc.data().name,
    //     //     breed: doc.data().breed,
    //     //     weight: doc.data().weight,
    //     //   };
    //       setDogs((dogs) => [...dogs, dog]);
    //     });
    console.log("bror", dogs);
  };

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
    <>
      <TouchableOpacity onPress={getDogs}>
        <Text>klick</Text>
      </TouchableOpacity>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SingleDog", { id: dog.id })}
            >
              <Text>{dog.name}</Text>
            </TouchableOpacity>
          </li>
        ))}
      </ul>
    </>
  );
};
