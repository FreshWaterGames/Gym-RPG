import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Monster } from "../Classes/monster.types";
import { User } from "../Classes/user.types";
import { updateUserData } from "../database/userData";
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
  const [startFade, setFade] = useState<Boolean>(false)
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
          updateMonsterHealth({ curUser, setCurUser, curMonster, setMonster, startFade, setFade });
        }}
      >
        <Text
          style={{
            fontSize: 250,
            textAlign: "center",
          }}
        >
          { /* Da Monster */ }
          🧌
        </Text>
      </TouchableOpacity>
      <FadeInView 
        startFade={startFade} 
        style={styles.fadeView} 
        onFadeComplete={() => setFade(false)}>
        <Text style={styles.fadeText}>+ {curMonster.level * 5} Gold!</Text>
      </FadeInView>
    </View>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  style?: any; //Define style if possible
  startFade: Boolean; //this is what triggers animation,
  onFadeComplete?: () => void;
}
const FadeInView = (props: FadeInProps) => {
  //Initial value for opacity is 0 so it can come into view
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { startFade, onFadeComplete } = props;
  useEffect(() => {
    if (startFade == true) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(({finished}) => {
              if(finished && onFadeComplete)
              onFadeComplete();
            });
          }, 2000);
        }
      });
    }
  }, [startFade, fadeAnim, onFadeComplete]);

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

const updateMonsterHealth = async ({
  curUser,
  setCurUser,
  curMonster,
  setMonster,
  startFade,
  setFade,
}: {
  curUser: User;
  setCurUser: (curUser: User) => void;
  curMonster: Monster;
  setMonster: (curMonster: Monster) => void;
  startFade: Boolean,
  setFade: (startFade: Boolean) => void;
}) => {
  let newHealth = curMonster.health - curUser.attackStat;
  if (newHealth <= 0) {
    try {
      await updateGold({ curUser, setCurUser, curMonster, setMonster });
      setFade(true)
    } catch (error) {
      console.log(error);
    }
    setMonster({
      ...curMonster,
      health: 30,
    });
  } else {
    setMonster({
      ...curMonster,
      health: newHealth,
    });
  }
};

const updateGold = async ({
  curUser,
  setCurUser,
  curMonster,
  setMonster,
}: {
  curUser: User;
  setCurUser: (curUser: User) => void;
  curMonster: Monster;
  setMonster: (curMonster: Monster) => void;
}) => {
  try {
    /*
    const lastXP = await getSpecificVal("xpToLevel");
    //Const for xp calc
    const xpWeight = 15 * 2.39;
    const xpCalc = Number(
      Math.round(xpWeight * curMonster.level + lastXP)
    );

    
    //need to check if can level up, if false dont level up
    //else level up
    if (levelCheck(xpCalc, curUser.xpMax) == false) {
      await updateUserData("xpToLevel", xpCalc);
      setCurUser({
        ...curUser,
        xpToLevel: xpCalc,
      });
    } else {
      /*
      levelUp(curUser, setCurUser);
    }
    */
    const newGold = curMonster.level * 5 + curUser.gold;
    console.log(`gold: ${newGold}`);
    //Need to make this a helper function
    updateUserData("gold", newGold);
    setCurUser({
      ...curUser,
      gold: newGold,
    });

    setMonster({
      ...curMonster,
      health: 30,
    });
  } catch (error) {
    console.log(error);
  }
};
