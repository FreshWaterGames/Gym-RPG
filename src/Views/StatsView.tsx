import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { User } from "../Classes/user.types";
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
            <Text style={styles.nameTxt}>HP: {curUser.heatlh}</Text>
            <Text style={styles.nameTxt}>Level: {curUser.level}</Text>
            <Text style={styles.nameTxt}>XP: {curUser.xpToLevel}</Text>
          </View>
          <View style={styles.xpBar} key={curUser.xpToLevel}>
            <View
              style={{
                backgroundColor: "orange",
                width: `${viewPercent}%`,
                height: "100%",
              }}
            ></View>
                        <Text style={{
                color: 'white',
                fontSize: 15,
                fontStyle: 'italic',
                position: 'relative',
                right: '0%',
                left: '45%',
                bottom: '90%'
                
            }}>{curUser.xpToLevel}/{curUser.xpMax}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.statsInfo}>
        {Object.entries(curUser.stats).map(([muscleName, lvl]) => {
          return (
            <View key={muscleName} style={{ flexDirection: "row", padding: 3 }}>
              <Text style={styles.statsTxt}>
                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}:{" "}
                {lvl}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
