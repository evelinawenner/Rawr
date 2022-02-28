import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LanguageContext } from "../../globals/context/languageContext/LanguageContext";

interface IProps {
  weight: number;
}

export const BarfCalculator = (props: IProps) => {
  const context = useContext(LanguageContext);

  const [foodPerDay, setFoodPerDay] = useState(0);
  const [foodPerMeal, setFoodPerMeal] = useState(0);
  const [muscleMeat, setMuscleMeat] = useState(0);
  const [bone, setBone] = useState(0);
  const [liver, setLiver] = useState(0);
  const [organMeat, setOrganMeat] = useState(0);
  const [muscleMeatHalf, setMuscleMeatHalf] = useState(0);
  const [boneHalf, setBoneHalf] = useState(0);
  const [liverHalf, setLiverHalf] = useState(0);
  const [organMeatHalf, setOrganMeatHalf] = useState(0);
  const [seeAmount, setSeeAmount] = useState(false);

  const foodAmountCalculator = () => {
    setSeeAmount(true);
    const total = Math.floor(props.weight * 0.02);
    setFoodPerDay(total);
    setMuscleMeat(Math.floor(total * 0.8));
    setBone(Math.floor(total * 0.1));
    setLiver(Math.floor(total * 0.05));
    setOrganMeat(Math.floor(total * 0.05));
    const half = Math.floor(total * 0.5);
    setFoodPerMeal(half);
    setMuscleMeatHalf(Math.floor(half * 0.8));
    setBoneHalf(Math.floor(half * 0.1));
    setLiverHalf(Math.floor(half * 0.05));
    setOrganMeatHalf(Math.floor(half * 0.05));
    console.log(foodPerDay);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.heading}>
        {context.language.language.calc_heading}
      </Text>
      <Text>
        {context.language.language.weight}: {props.weight}g
      </Text>
      {seeAmount === true ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSeeAmount(false)}
          >
            <Text style={styles.buttonText}>
              {context.language.language.hide}
            </Text>
          </TouchableOpacity>
          <Text style={styles.subHeading}>
            {context.language.language.calc_amount_day}:{" "}
          </Text>
          <Text>
            {context.language.language.calc_tot}: {foodPerDay}g
          </Text>
          <Text>
            {context.language.language.calc_musclemeat}: {muscleMeat}g
          </Text>
          <Text>
            {context.language.language.calc_bone}: {bone}g
          </Text>
          <Text>
            {context.language.language.calc_liver}: {liver}g
          </Text>
          <Text>
            {context.language.language.calc_organmeat}: {organMeat}g
          </Text>
          <Text></Text>
          <Text style={styles.subHeading}>
            {context.language.language.calc_amount_meal}:
          </Text>
          <Text>
            {context.language.language.calc_tot}: {foodPerMeal}g
          </Text>
          <Text>
            {context.language.language.calc_musclemeat}: {muscleMeatHalf}g
          </Text>
          <Text>
            {context.language.language.calc_bone}: {boneHalf}g
          </Text>
          <Text>
            {context.language.language.calc_liver}: {liverHalf}g
          </Text>
          <Text>
            {context.language.language.calc_organmeat}: {organMeatHalf}g
          </Text>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={foodAmountCalculator}>
          <Text style={styles.buttonText}>
            {context.language.language.calc_calc}
          </Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
  },

  subHeading: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#ef9458",
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
