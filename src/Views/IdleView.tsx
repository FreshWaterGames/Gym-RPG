import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Monster } from "../Classes/monster.types";
import { User } from "../Classes/user.types";
import { getSpecificVal, updateUserData } from "../database/userData";
import { levelCheck, levelUp } from "../Helper/userHelper";
import { styles } from "../styles";

const temp_Monster: Monster = {
  health: 30,
  level: 1,
};
export const IdleView = ({
  curUser,
  setCurUser,
}: {
  curUser: User;
  setCurUser: (curUser: User) => void;
}) => {
  const [curMonster, setMonster] = useState<Monster>(temp_Monster);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          textAlign: "center",
          paddingTop: 20,
        }}
      >
        Health: {curMonster.health}
      </Text>
      <TouchableOpacity
        onPress={async () => {
          //Needs to be monster reset function
          //Like resetMonster() or something
          const newHealth = curMonster.health - 1;
          setMonster({
            ...curMonster,
            health: newHealth,
          });

          {
            if (newHealth == 0) {
              try {
                checkXP({curUser, setCurUser, curMonster, setMonster})
              }
              catch(error){
                console.log(error)
              }
            }
          }
        }}
      >
        <Text
          style={{
            fontSize: 250,
            textAlign: "center",
          }}
        >
          🧌
        </Text>
      </TouchableOpacity>
      <FadeInView health={curMonster.health} style={styles.fadeView}>
        <Text style={styles.fadeText}>
          + {15 * 2.39 * curMonster.level} XP!
        </Text>
      </FadeInView>
      {levelCheck(curUser.xpToLevel, curUser.xpMax) 
      ? <FadeInView health={0}>
          <Text>Leveled Up to level {curUser.level}!</Text>
      </FadeInView>
      : <View></View>}
    </View>
  );
};


interface FadeInProps {
  children: React.ReactNode;
  style?: any; //Define style if possible
  health: number; //this is what triggers animation
}
const FadeInView = (props: FadeInProps) => {
  //Initial value for opacity is 0 so it can come into view
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { health } = props;
  useEffect(() => {
    if (health <= 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, 2000);
        }
      });
    }
  }, [health, fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, //Binding
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const checkXP = async({curUser, setCurUser, curMonster, setMonster} : {curUser: User, setCurUser: (curUser: User) => void, curMonster: Monster, setMonster: (curMonster: Monster) => void}) => {
  try {
    const lastXP = await getSpecificVal("xpToLevel");
    //Const for xp calc
    const xpWeight = 15 * 2.39;
    const xpCalc = Number(
      Math.round(xpWeight * curMonster.level + lastXP)
    );

    //need to check if can level up
    if (levelCheck(xpCalc, curUser.xpMax) == false) {
      await updateUserData("xpToLevel", xpCalc);
      setCurUser({
        ...curUser,
        xpToLevel: xpCalc,
      });
    } else {
      levelUp(curUser, setCurUser);
    }

    setMonster({
      ...curMonster,
      health: 30,
    });
  } catch (error) {
    console.log(error);
  }
}