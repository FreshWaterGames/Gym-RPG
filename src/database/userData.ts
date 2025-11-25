import * as SQLite from "expo-sqlite";
import { User } from "../Classes/user.types";

const db = SQLite.openDatabaseSync("gymRPG.db");

export const connectToDatabase = async () => {
  return SQLite.openDatabaseAsync("gymRPG.db");
};

export const removeTable = async () => {
  await db.getAllAsync("DROP TABLE IF EXISTS UserData");
};
//Table Name UserData
export const createTables = async () => {
  const userDataQuery = `
    CREATE TABLE IF NOT EXISTS UserData (
        id INTEGER DEFAULT 1,
        username TEXT,
        level INTEGER,
        curMuscleXP INTEGER,
        xpToLevel INTEGER,
        xpMax INTEGER,
        attackStat INTEGER,
        health INTEGER,
        
        -- Muscle Base Stats
        chest INTEGER,
        bicep INTEGER,
        tricep INTEGER,
        delts INTEGER,
        lats INTEGER,
        traps INTEGER,
        quads INTEGER,
        glutes INTEGER,
        calfs INTEGER,
        hamstring INTEGER,
        abs INTEGER,
        obliques INTEGER,

        -- Muscle XP Stats (New Columns)
        chestXP INTEGER,
        bicepXP INTEGER,
        tricepXP INTEGER,
        deltsXP INTEGER,
        latsXP INTEGER,
        trapsXP INTEGER,
        quadsXP INTEGER,
        glutesXP INTEGER,
        calfsXP INTEGER,
        hamstringXP INTEGER,
        absXP INTEGER,
        obliquesXP INTEGER,
        
        PRIMARY KEY(id)
    )
  `;

  try {
    await db.execAsync(userDataQuery);
  } catch (error) {
    console.log(error);
    throw Error("Failed to create tables");
  }
};

export const updateUserData = async (columnName: string, newValue: number) => {
  const query = `
        UPDATE UserData
        SET ${columnName} = ?
        WHERE id = 1;
    `;
  try {
    //The [newValue] will be used where the ? at
    return db.runAsync(query, [newValue]);
  } catch (error) {
    console.log(error);
    throw Error("Failed to updated user info");
  }
};

//Shows All Tables available
export const getTable = async () => {
  try {
    const tableNames: string[] = [];

    const results = await db.getAllAsync(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`);
  } catch (error) {
    console.error(error);
    throw Error("Failed to get table from db");
  }
};

export const removeAllUsers = async () => {
  const result = await db.getAllAsync("DELETE FROM UserData");
  console.log("\n\n\n");
};
export const printAllUsers = async () => {
  const results = await db.getAllAsync("SELECT * FROM UserData");
  console.log(results);
};
export const printUserData = async () => {
  const results = await db.getAllAsync("SELECT * FROM UserData WHERE id = 1");
  console.log(results);
};

export const getSpecificVal = async (val: string) => {
  const results: any = await db.getAllAsync(
    "SELECT xpToLevel FROM UserData WHERE id = 1"
  );
  console.log(results[0].xpToLevel);
  return results[0].xpToLevel;
};

export const getUserData = async (): Promise<User | null> => {
  try {
    //Checking Database for user
    const results = await db.getAllAsync("SELECT * FROM UserData WHERE id = 1");
    if (results == null || results.length === 0) {
      console.log("No user found in UserData");
      return null;
    }

    //Gets row data
    const userFromDB: any = results[0];
    //IF THIS APPREARS RED ITS FINE Vscode just dont know how to read it
    const curUser: User = {
      id: userFromDB.id.toString(),
      username: userFromDB.username,
      level: userFromDB.level,
      heatlh: userFromDB.health,
      xpToLevel: userFromDB.xpToLevel,
      xpMax: userFromDB.xpMax,
      attackStat: userFromDB.attackStat,
      curMuscleXP: userFromDB.curMuscleXP,

      stats: {
        chest: userFromDB.chest,
        bicep: userFromDB.bicep,
        tricep: userFromDB.tricep,
        delts: userFromDB.delts,
        lats: userFromDB.lats,
        traps: userFromDB.traps,
        quads: userFromDB.quads,
        glutes: userFromDB.glutes,
        calfs: userFromDB.calfs,
        hamstring: userFromDB.hamstring,
        abs: userFromDB.abs,
        obliques: userFromDB.obliques, // typo in interface "obleques"
      },

      statsXP: {
        chestXP: userFromDB.chestXP,
        bicepXP: userFromDB.bicepXP,
        tricepXP: userFromDB.tricepXP,
        deltsXP: userFromDB.deltsXP,
        latsXP: userFromDB.latsXP,
        trapsXP: userFromDB.trapsXP,
        quadsXP: userFromDB.quadsXP,
        glutesXP: userFromDB.glutesXP,
        calfsXP: userFromDB.calfsXP,
        hamstringXP: userFromDB.hamstringXP,
        absXP: userFromDB.absXP,
        obliquesXP: userFromDB.obliquesXP,
      },
    };
    if (curUser != null) {
      return curUser;
    }
    return null;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

//This doenst need to run more than once just to get the player in
export const addUser = async (username: string) => {
  const constanttMult = 2.39;
  try {
    const userResults = await getUserData();
    if (userResults == null) {
      //Freaking mathx
      //const xpMax = Math.pow(1/constanttMult, 2)
      const sql = `INSERT OR IGNORE INTO UserData (
        username, level, curMuscleXP, xpToLevel, xpMax, attackStat, health,
        chest, bicep, tricep, delts, lats, traps,
        quads, glutes, calfs, hamstring, abs, obliques,
        chestXP, bicepXP, tricepXP, deltsXP, latsXP, trapsXP,
        quadsXP, glutesXP, calfsXP, hamstringXP, absXP, obliquesXP
      ) VALUES (?, 1, 0, 0, 100, 1, 1, 
                1, 1, 1, 1, 1, 1, 1, 1, 
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1)`;
      const result = await db.runAsync(sql, [username]);
      return result.lastInsertRowId;
    } else {
      console.log("User is not null Womp Womp");
    }
  } catch (error) {
    console.error(error);
    throw Error("Failed to add user");
  }
};
