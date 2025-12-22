import * as SQLite from "expo-sqlite";
import { WorkoutData } from "../Classes/calender.types";

const db = SQLite.openDatabaseSync("gymRPG.db");


export const printCalData = async() => {
    const results = await db.getAllAsync("SELECT * FROM CalenderData")
    console.log("\n\nResults:", results, "\n\n")
}

//DROP TABLE IF EXISTS CalenderData;
export const createCalenderTable = async() => {
    const queryData = `
        CREATE TABLE IF NOT EXISTS CalenderData(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userID INTEGER,
            date TEXT,
            muscleType TEXT,
            weight INTEGER,
            sets INTEGER,
            reps INTEGER
        )
    `
    try{
        db.execAsync(queryData)
    }
    catch(error){
        console.log(error)
        throw Error("Could not create Table")
    }
    
}

export const updateCalData = async(columnName: string, data: WorkoutData) => {
    try{
    const queryData = `
        UPDATE CalenderData
        WHERE ${data}
    `
    }catch(error){
        console.log(error)
        throw Error("Could not update Calender Data for whatever reason my nigg")
    }
}

export const getLastID = async() =>{
    try{
        const queryData = `SELECT MAX(id) FROM CalenderData`
        const result = await db.getAllAsync(queryData)
        const rows = result as Record<string, number>[]
        const lastId = rows[0]["MAX(id)"]
        console.log(lastId)
        return queryData
    }catch(error){
        console.log(error)
        throw Error("Could not getLastID")
    }
}


export const addEntry = async(data: WorkoutData, dateStr: string) => {
    try{
        const queryData = `
           INSERT OR IGNORE INTO CalenderData (
            userID, date, muscleType, weight, sets, reps
           ) VALUES (1, ?, ?, ?, ?, ?)
        `
        await db.runAsync(queryData,[dateStr, data.muscle, data.weight, data.sets, data.reps])
    } catch(error){
        console.log(error)
        throw Error("Could not add Entry")
    }
}

export const getWorkoutByDate = async(dateStr: string) => {
    try{
        const queryData = `SELECT * FROM CalenderData WHERE date = ?`;
        const results = await db.getAllAsync(queryData, [dateStr]);
        return results;
    }catch(error){
        console.log(error)
        throw Error("Could not get Workout by Date")
    }
}

export const getCalData = async() => {
    return db.getAllAsync("SELECT * FROM CalenderData")
}

export const resetCalender = async() => {
    const queryData = `
        DROP TABLE CalenderData
    `
    db.getAllAsync(queryData)
    await createCalenderTable()
}