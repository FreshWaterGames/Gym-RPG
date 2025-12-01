import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { MuscleGroup, MuscleGroupXP, User } from "../Classes/user.types";
import { muscleXPMax } from "../Helper/userHelper";
import { styles } from "../styles";

export const Stats = ({
  curUser,
  setCurUser,
}: {
  curUser: User;
  setCurUser: (curUser: User) => void;
}) => {
  //Need to have percentage where itd be based on the level
  //Test Percentage
  const [viewPercent, setPercent] = useState(
    (curUser.xpToLevel / curUser.xpMax) * 100
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 2,
          backgroundColor: "#0f172a",
        }}
      >
        <Image
          source={require("../assets/images/pfp.png")}
          style={styles.pfp}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.nameTxt}>{curUser.username}</Text>
            {//<Text style={styles.nameTxt}>HP: {curUser.heatlh}</Text>
            }
            <Text style={styles.nameTxt}>Level: {curUser.level}</Text>
            <Text style={styles.nameTxt}>Attack: {curUser.attackStat}</Text>
            <View style={{flexDirection: "row",}}>
            <Image source={require("../assets/images/coin.png")}
                   style={styles.coin}/>
                   <Text style={styles.nameTxt}>: {curUser.gold}</Text>
            </View>
          </View>
          <View style={styles.xpBar} key={curUser.xpToLevel}>
            <View
              style={{
                backgroundColor: "orange",
                width: `${viewPercent}%`,
                height: "100%",
              }}
            ></View>
                <Text style={styles.xpText}>
                  {curUser.xpToLevel}/{curUser.xpMax}
                </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.statsInfo}>
        {Object.entries(curUser.stats).map(([muscleName, lvl]) => {
          const [xpPercent, setPercent] = useState()
          const curMuscleXPMax = muscleXPMax(curUser.stats[muscleName as keyof MuscleGroup])
          const muscleXPStr = muscleName + "XP"
          const curWidth = (curUser.statsXP[muscleXPStr as keyof MuscleGroupXP]/curMuscleXPMax) * 100
          return (
            <View key={muscleName} style={{ flexDirection: "row", padding: 3}}>
              <Text style={styles.statsTxt}>
                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}:{" "}
                {lvl}
              </Text>
              <View style={{
                width: "60%",
                height: 25,
                zIndex: 0,
                borderWidth: 1
              }}>
                <View
                style={{
                  backgroundColor: 'orange',
                  width: `${curWidth}%`,
                  height: "100%"
                }}
                ></View>
                <Text style={styles.xpText2}>
                  {curUser.statsXP[muscleXPStr as keyof MuscleGroupXP]}/{curMuscleXPMax}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
