import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { User } from "../Classes/user.types";
import { resetCalender } from "../database/calenderData";
import {
  addUser,
  getUserData,
  removeAllUsers
} from "../database/userData";
import { styles } from "../styles";

export const SettingsView = ({
  curUser,
  setUser,
}: {
  curUser: User;
  setUser: (curUser: User) => void;
}) => {
  return (
    <View style={{
      flexDirection: "row",
    }}>
      <TouchableOpacity
        style={styles.tabsButton}
        onPress={async () => {
          try {
            await resetUser({ curUser, setUser });
            //console.log("After Press");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text style={styles.tabsButtonTxt}>Reset Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabsButton}
        onPress={async () => {
          try {
            await resetCalenderBTN();
            //console.log("After Press");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text style={styles.tabsButtonTxt}>Reset Calender</Text>
      </TouchableOpacity>
    </View>
  );
};

const resetUser = async ({
  curUser,
  setUser,
}: {
  curUser: User;
  setUser: (curUser: User) => void;
}) => {
  //await printAllUsers()
  await removeAllUsers();
  //await printAllUsers()
  await addUser(curUser.username);
  let tempUser = await getUserData();
  if (tempUser != null) {
    setUser(tempUser);
  } else {
    console.log("Could not set User");
  }
};


const resetCalenderBTN = async() => {
  await resetCalender()
}
