import { User } from "../Classes/user.types";
import { updateUserData } from "../database/userData";

export const levelUp = async(curUser: User, setCurUser: (curUser: User) => void) => {
  await updateUserData("level", curUser.level + 1);
  await updateUserData("xpToLevel", 0);
  const nextXP = Math.pow(curUser.level, 3) + curUser.xpMax;
  await updateUserData("xpMax", nextXP);

  setCurUser({
    ...curUser,
    level: curUser.level + 1,
    xpToLevel: 0,
    xpMax: nextXP,
  });
};

export const levelCheck = (xpToLevel: number, xpMax: number) => {
  if (xpToLevel >= xpMax) {
    return true;
  }
  return false;
};
