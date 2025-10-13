import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { User } from "../Classes/user.types";


export const connectToDatabase = async () => {
  return openDatabaseAsync('gymRPG.db')
}

//Table Name UserData
export const createTables = async (db: SQLiteDatabase) => {
  console.log("creating query")
  const userDataQuery = `
    CREATE TABLE IF NOT EXISTS UserData (
        id INTEGER DEFAULT 1,
    username TEXT,
    level INTEGER,
    curXP INTEGER,
    xpToLevel INTEGER,
    health INTEGER,
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
    PRIMARY KEY(id)
    )
  `;

  try {
    await db.execAsync(userDataQuery);
  } catch (error) {
    console.log(error);
    throw Error("Failed to create tables");
  }
}

export const updateUserData = async (
  db:  SQLiteDatabase,
  columnName: string,
  newValue: number
) => {
  const query = `
        UPDATE UserData
        SET ${columnName} = ?
        WHERE id = 1;
    `
  try {
    //The [newValue] will be used where the ? at
    return db.runAsync(query,[newValue])
  } catch (error) {
    console.log(error);
    throw Error("Failed to updated user info");
  }
}



//Shows All Tables available
export const getTable = async (db:  SQLiteDatabase) => {
  try {
    const tableNames: string[] = []

    const results = await db.getAllAsync(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
    )
    
  } catch(error){
    console.error(error)
    throw Error("Failed to get table from db")
  }
}


/*
Function not needed right now since we only got one table
export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {

}
*/


export const getUserData = async(db:  SQLiteDatabase): Promise<User | null> => {
    try{
      console.log("inside getUserData")
        //Checking Database for user
        const results = await db.getAllAsync("SELECT * FROM UserData")
        if(results == null){
            console.log("No user found in UserData");
            return null;
        }

        //Gets row data
        const userFromDB: any = results[0]
        console.log("These them results you was askin fir")
        console.log(userFromDB)
        //IF THIS APPREARS RED ITS FINE Vscode just dont know how to read it
        const curUser: User = {
          id: userFromDB.id.toString(),
          username: userFromDB.username,
          level: userFromDB.level,
          heatlh: userFromDB.health, 
          xpToLevel: userFromDB.xpToLevel,
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
            obleques: userFromDB.obliques // Note: typo in interface "obleques"
          }
        };
        if(curUser != null){
          return curUser
        }
        return null
    } catch(error){
        console.error("Error getting data:", error)
        throw error
    }
}


//This doenst need to run more than once just to get the player in
export const addUser = async (db:  SQLiteDatabase, user: User) =>{
  try{
    const result = await db.runAsync(
      `INSERT OR IGNORE INTO UserData (
        username, level, curXP, xpToLevel, health,
        chest, bicep, tricep, delts, lats, traps,
        quads, glutes, calfs, hamstring, abs, obliques
      ) VALUES (?, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)`,
      [user.username]
    );
    return result.lastInsertRowId
  } catch(error){
    console.error(error)
    throw Error("Failed to add user")
  }
}