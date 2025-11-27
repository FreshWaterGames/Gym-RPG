import { MuscleGroup, User } from "../Classes/user.types";
import { updateUserData, connectToDatabase, createTables,
  getUserData, addUser
 } from "../database/userData";

export const levelUp = async (
  curUser: User,
  setCurUser: (curUser: User) => void
) => {
  await updateUserData("level", curUser.level + 1);
  await updateUserData("xpToLevel", 0);
  const nextXP = Math.pow(curUser.level, 3) * curUser.xpMax;
  await updateUserData("xpMax", nextXP);


  //I dont think this is updating user on screen
  setCurUser({
    ...curUser,
    level: curUser.level + 1,
    xpToLevel: 0,
    xpMax: nextXP,
  });

  const attackSt = getAttackStat(curUser)
  console.log('attack stat update')
  console.log(attackSt)
  await updateUserData("attackStat", attackSt)

  setCurUser({
    ...curUser,
    attackStat: attackSt,
  })
};

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
  console.log("getting attack final")
  console.log(attackFinal)
};

export const setAllStats = ({
  curUser,
  setUser,
}: {
  curUser: User;
  setUser: (curUser: User) => void;
}) => {
  setUser({
    ...curUser,
    attackStat: getAttackStat(curUser),
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
