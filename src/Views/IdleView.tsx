import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Monster } from "../Classes/monster.types";
import { User } from "../Classes/user.types";
import { getSpecificVal, updateUserData } from "../database/userData";
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
  const [curMontser, setMonster] = useState<Monster>(temp_Monster);
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
        Health: {curMontser.health}
      </Text>
      <TouchableOpacity
        onPress={async () => {
          //Needs to be monster reset function
          //Like resetMonster() or something
          const newHealth = curMontser.health - 1;
          setMonster({
            ...curMontser,
            health: newHealth,
          });

          {
            if (newHealth == 0) {
              try {
                const lastXP = await getSpecificVal("xpToLevel");

                //Const for xp calc
                const xpWeight = 15 * 2.39;
                const xpCalc = Number(
                  Math.round(xpWeight * curMontser.level + lastXP)
                );

                //need to check if can level up
                if (levelCheck(xpCalc, curUser.xpMax) == false) {
                  updateUserData("xpToLevel", xpCalc);
                  setCurUser({
                    ...curUser,
                    xpToLevel: xpCalc,
                  });
                } else {
                  levelUp(curUser, setCurUser);
                }

                setMonster({
                  ...curMontser,
                  health: 30,
                });
              } catch (error) {
                console.log(error);
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
      <FadeInView health={curMontser.health} style={styles.fadeView}>
        <Text style={styles.fadeText}>
          + {15 * 2.39 * curMontser.level} XP!
        </Text>
      </FadeInView>
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

//Move all functions to new file idk what to call it
const levelCheck = (xpToLevel: number, xpMax: number) => {
  if (xpToLevel >= xpMax) {
    return true;
  }
  return false;
};

const levelUp = (curUser: User, setCurUser: (curUser: User) => void) => {
  updateUserData("level", curUser.level + 1);
  updateUserData("xpToLevel", 0);
  const nextXP = Math.pow(curUser.level, 3);
  updateUserData("xpMax", nextXP);

  //Zack will set fr xp

  setCurUser({
    ...curUser,
    level: curUser.level + 1,
    xpToLevel: 0,
    xpMax: nextXP,
  });
};
