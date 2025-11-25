import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MuscleGroup, MuscleGroupXP, User } from "../Classes/user.types";
import { updateUserData } from "../database/userData";
import { checkMuscleLvlUp, muscleXPMax } from "../Helper/userHelper";
import { styles } from "../styles";

export const Workout = ({
  curUser,
  setCurUser,
}: {
  curUser: User;
  setCurUser: (user: User) => void;
}) => {
  // manages the checked box value of muscle group values
  const [checkedMuscles, setCheckedMuscles] = useState<{
    [key: string]: boolean;
  }>({});
  // saves the string value of the checked box
  const [muscleString, setMuscleString] = useState("");

  const [setsVal, setSetsVal] = useState("");
  const [repsVal, setRepVal] = useState("");
  const [weightVal, setWeightVal] = useState("");

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Sets"
          placeholderTextColor={"grey"}
          keyboardType="default"
          value={setsVal}
          onChangeText={setSetsVal}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Reps"
          placeholderTextColor={"grey"}
          keyboardType="default"
          value={repsVal}
          onChangeText={setRepVal}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Weight"
          placeholderTextColor={"grey"}
          keyboardType="default"
          value={weightVal}
          onChangeText={setWeightVal}
        ></TextInput>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Object.entries(curUser.stats).map(([muscleName]) => {
          return (
            <View key={muscleName} style={styles.checkBox}>
              <Text style={styles.statsTxt}>
                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}
              </Text>

              <CheckBox
                value={checkedMuscles[muscleName] || false}
                onValueChange={(newValue) => {
                  // maybe sets the checkbox to true or false??
                  setCheckedMuscles((prev) => ({
                    ...prev,
                    [muscleName]: newValue,
                  }));
                  // sets muscleString to be the current muscle name
                  if (newValue) {
                    setMuscleString(muscleName);
                  }
                }}
              />
            </View>
          );
        })}
      </View>

      {/* Update button */}
      <View>
        <TouchableOpacity
          style={styles.tabsButton}
          onPress={() => {
            const finalVal = finalCalc(setsVal, repsVal, weightVal);
            const newMuscleValue = Number(
              curUser.stats[muscleString as keyof MuscleGroup] + finalVal
            );
            updateStats(curUser, setCurUser, newMuscleValue, muscleString);
          }}
        >
          <Text style={styles.tabsButtonTxt}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const finalCalc = (sets: string, reps: string, weight: string) => {
  const setsValue = Number(sets);
  const repsValue = Number(reps);
  const weightValue = Number(weight);

  const xpMultiplier = 0.2;
  return setsValue * repsValue * weightValue * xpMultiplier;

  // need xp max for muscles
};

const updateStats = async (
  curUser: User,
  setUser: (user: User) => void,
  muscleVal: number,
  muscleStr: string
) => {
  const muscleXP = muscleStr + "XP";
  let newXP = curUser.statsXP[muscleXP as keyof MuscleGroupXP] + muscleVal;
  let xpMax = muscleXPMax(curUser.stats[muscleStr as keyof MuscleGroup]);
  
  //do{
  //If user didnt level up just update
  if (checkMuscleLvlUp(newXP, xpMax) == false) {
    setUser({
      ...curUser,
      statsXP: {
        ...curUser.statsXP,
        [muscleXP]: newXP,
      },
    });

    //console.log(muscleString);
    // data update
    await updateUserData(muscleXP, newXP);
  }
  else{
    //This levels up the user by 1 if xp is over
    const newLVL = curUser.stats[muscleStr as keyof MuscleGroup] + 1
    //This gets the left over xp after level up
    const remainderXP = newXP % xpMax
    setUser({
        ...curUser,

        stats: {
          ...curUser.stats,
          [muscleStr]: newLVL,
        },
        statsXP: {
            ...curUser.statsXP,
            [muscleXP]: remainderXP,
        },
    });
    await updateUserData(muscleStr, newLVL)
    await updateUserData(muscleXP, remainderXP)

    newXP = curUser.statsXP[muscleXP as keyof MuscleGroupXP] + muscleVal;
    xpMax = muscleXPMax(curUser.stats[muscleStr as keyof MuscleGroup]);
  }
  //} while(checkMuscleLvlUp(newXP, xpMax) == true)
};
