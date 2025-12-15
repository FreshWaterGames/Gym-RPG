import { MuscleGroup, MuscleGroupXP, User } from "../Classes/user.types";
import {
  addUser,
  connectToDatabase, createTables,
  getUserData, updateUserData
} from "../database/userData";

export const updateDict = {
  "chest" : false,
  "tricep": false,
  "delts": false,
  "lats": false,
  "traps": false,
  "quads": false,
  "glutes": false,
  "calfs": false,
  "hamstring": false,
  "abs": false,
  "obliques": false,
}

export const levelCheck = (xpToLevel: number, xpMax: number) => {
  if (xpToLevel >= xpMax) {
    return true;
  }
  return false;
};

export const getAttackStat = (curUser: User) => {
  let attackSum = 1;
  let muscleLen = 0;
  for (const muscleString in curUser.stats) {
    attackSum *= curUser.stats[muscleString as keyof MuscleGroup];
    muscleLen += 1;
  }

  const attackFinal = (curUser.level * attackSum) / (muscleLen + curUser.level);
  if (attackFinal < 1) {
    return 1;
  } else {
    return attackFinal;
  }
};

export const setAllStats = ({curUser,setUser,}: {curUser: User; setUser: (curUser: User) => void;}) => {
 setUser({
    ...curUser
  });
};


export const initDatabase = async ({
  curUser,
  setLoading,
  setUser,
}: {
  setLoading: (isLoading: Boolean) => void;
  setUser: (curUser: User) => void;
  curUser: User;
}) => {
  const db = await connectToDatabase();
  //await resetDB(curUser);
  await createTables();
  const tempUser = await getUserData();
  if (tempUser != null) {
    console.log(tempUser);
    setLoading(false);
    setUser(tempUser);
    setAllStats({ curUser: tempUser, setUser: setUser });
  } else {
    await addUser(curUser.username);
    //await printUserData()
  }
  //printUserData();
};

export const muscleXPMax= (muscleLVL: number) => {
    const xpConst = 100
    const sum = xpConst * Math.pow(muscleLVL, 2)
    return sum
}

export const checkMuscleLvlUp = (muscleXP: number, xpMax: number) => {
  if(((muscleXP/xpMax) * 100) > 100){
    return true
  }
  else{
     return false
  }
}

export const updateStats = async (curUser: User, setUser: (user: User) => void, muscleVal: number, muscleStr: string
) => {
  const muscleXP = muscleStr + "XP";
  let newXP = curUser.statsXP[muscleXP as keyof MuscleGroupXP] + muscleVal;
  let xpMax = muscleXPMax(curUser.stats[muscleStr as keyof MuscleGroup]);
  updateDict[muscleStr as keyof typeof updateDict] = true

  //If user didnt level up just update
  if (checkMuscleLvlUp(newXP, xpMax) == false) {
    setUser({
      ...curUser,
      statsXP: {
        ...curUser.statsXP,
        [muscleXP]: newXP,
      },
    });

    // database change
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

};