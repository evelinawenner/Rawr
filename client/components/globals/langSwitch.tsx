import React, { useContext } from "react";
import { LanguageContext } from "./context/languageContext/LanguageContext";
import { DropdownStyled, DropItemNoLink } from "./DropdownStyled";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
const swe = require("./assets/sweden.png");
const uk = require("./assets/united-kingdom.png");

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export const LangSwitch = () => {
  const state = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          state.setLang("SE");
        }}
      >
        <Image style={styles.tinyLogo} source={swe} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          state.setLang("EN");
        }}
      >
        <Image style={styles.tinyLogo} source={uk} />
      </TouchableOpacity>
    </View>
  );
};
