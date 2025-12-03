import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { User } from "./Classes/user.types";
import {
  createTables,
  getTable,
  removeAllUsers,
  removeTable
} from "./database/userData";
import { initDatabase } from "./Helper/userHelper";
import { styles } from "./styles";
import { IdleView } from "./Views/IdleView";
import { SettingsView } from "./Views/SettingsView";
import { Stats } from "./Views/StatsView";
import { Workout } from "./Views/WorkoutView";

//Test User
const TEMP_USER: User = {
  id: "",
  username: "Zack",
  level: 1,
  heatlh: 1,
  xpMax: 1,
  attackStat: 1,
  curMuscleXP: 1,
  gold: 0, 
  stats: {
    chest: 1,
    bicep: 17,
    tricep: 1,
    delts: 37,
    lats: 7,
    traps: 19,
    quads: 1,
    glutes: 7,
    calfs: 6,
    hamstring: 1,
    abs: 1,
    obliques: 1,
  },
  statsXP: {
    chestXP: 1,
    bicepXP: 1,
    tricepXP: 1,
    deltsXP: 1,
    latsXP: 1,
    trapsXP: 1,
    quadsXP: 1,
    glutesXP: 1,
    calfsXP: 1,
    hamstringXP: 1,
    absXP: 1,
    obliquesXP: 1,
  },

  xpToLevel: 1,
};

const App = () => {
  const [curUser, setUser] = useState<User>(TEMP_USER); // user object
  const [curView, setView] = useState<number>(0); // Which screen state is being shown
  const [isLoading, setLoading] = useState<Boolean>(true);
  //const [db, setDB] = useState<SQLiteDatabase | null>(null)

  //resetDB(curUser)
  const renderView = () => {
    switch (curView) {
      case 0:
        if (isLoading == false) {
          return <Stats curUser={curUser} setCurUser={setUser} />;
        }
      case 1:
        return <Workout curUser={curUser} setCurUser={setUser} />;
      case 2:
        return <IdleView curUser={curUser} setCurUser={setUser} />;
      case 3:
        return <SettingsView curUser={curUser} setUser={setUser} />;
    }
  };

  //For Database both functions are in userData file
  //in database folder
  const loadData = useCallback(async () => {
    try {
      await initDatabase({ curUser, setLoading, setUser });
    } catch (error) {
      console.log(error);
      throw Error("Somehting went wrong in loadData");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={{ flex: 1 }}>
      {renderView()}
      <TabBar setCurView={setView} />
    </View>
  );
};

export const TabBar = ({
  setCurView,
}: {
  setCurView: (curView: number) => void;
}) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity style={styles.tabsButton} onPress={() => setCurView(0)}>
        <Text style={styles.tabsButtonTxt}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabsButton} onPress={() => setCurView(1)}>
        <Text style={styles.tabsButtonTxt}>Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabsButton} onPress={() => setCurView(2)}>
        <Text style={styles.tabsButtonTxt}>Idle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabsButton} onPress={() => setCurView(3)}>
        <Text style={styles.tabsButtonTxt}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};


//Be carful when using this makesure databse is right
//probably need to reset user after 
const resetDB = async (curUser: User) => {
  await removeAllUsers();
  await removeTable();
  console.log("removed table")
  await createTables();
  console.log("Created table")
  await getTable();
  /*
  await removeAllUsers();
  printUserData();
  await addUser(curUser.username)
  */
};

export default App;
