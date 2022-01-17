import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, createUserDocument } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { NavigationType } from "react-router";
import { useNavigation } from "@react-navigation/core";
import { StartPage } from "./startPage/StartPage";

interface IProps {
  userCredentials: string;
}

interface IUser {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Start", { userId: user.uid });
      }
    });

    unsubscribe();
  }, []);

  const handleSignup = async () => {
    //   auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(hej => {
    //       const user = userCredentials.user;
    //       console.log(user.email);

    //   }) .catch(error => alert(error.message))
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data.user.email);
    const user = data.user;

    await createUserDocument(user);
    console.log(user);
  };

  const handleLogin = async () => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log("logged in with: ", data.user.email);
    const user = data.user;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignup()}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
