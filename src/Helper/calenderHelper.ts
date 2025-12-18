import { WorkoutData } from "../Classes/calender.types";
import { addEntry, getCalData, getLastID, getWorkoutByDate } from "../database/calenderData";

export const updateCalender = async(
    muscleString: string,
    setsVal: string,
    repsVal: string,
    weightVal: string,
    workoutsByDate: {[key: string]: WorkoutData[]},
    setWorkoutsByDate: (value: {[key: string]: WorkoutData[]}) => void,
    markedDates: {[key: string]: any},
    setMarkedDates: (value: {[key: string]: any}) => void
) => {
    try{
    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
    //Workout Entry
    //printCalData();
    const nextID = await getLastID()
    //console.log(nextID)
    const entry: WorkoutData = {
        id: 0,
        muscle: muscleString,
        sets: setsVal,
        reps: repsVal,
        weight: weightVal,
        timestamp: Date.now()
    };

    const updatedWokouts =  {
        ...workoutsByDate,
        [today]: [...(workoutsByDate[today] || []), entry]
    };

    setWorkoutsByDate(updatedWokouts)
    const results = await getCalData()

    results.forEach((curDate: any) => {
        const curWorkout: WorkoutData = {
            id: curDate.id,
            muscle: curDate.muscleString,
            sets: curDate.etsVal,
            reps: curDate.repsVal,
            weight: curDate.weightVal,
            timestamp: curDate.date
        }
        const curDay = `${new Date(curWorkout.timestamp).getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
        //console.log(curWorkout.timestamp)

        setMarkedDates({
            ...markedDates,
            [curDay]: {marked: true, dotColor: 'green'}
        })
    })
    /*
    setMarkedDates({
        ...markedDates,
        [today]: {marked: true, dotColor: 'green'}
    })
        */

    //Update in SQL
    //console.log(entry)
    await addEntry(entry, today)
    //await printCalData()
}
catch(error){
    console.log(error)
    throw Error("Could not update I think")
}

}

//Need to pull from Sql to the specific date
export const setWorkoutData = async( 
    workoutByDate: {[key: string]: WorkoutData[]}, 
    setWorkoutsByDate: (workoutByDate: {[key: string]: WorkoutData[]}) => void, 
    markedDates: {[key: string]: any}, 
    setMarkedDates: (markedDates: {[key: string]: any}) => void, 
    dateStr: string
) => {
    //console.log("Inside setWorkoutData")
    const results = await getWorkoutByDate(dateStr)
    //console.log("Results in setWorkout\n", results)
    const newSet: WorkoutData[] = results.map((row: any) => ({
        id: row.id,
        muscle: row.muscleType,
        sets: String(row.sets),
        reps: String(row.reps),
        weight: String(row.weight),
        timestamp: new Date(row.date).getTime()
    }))
    console.log("\n\nnew Set: \n\n",newSet)
    
    // Update marked dates
    const newMarkedDates = { ...markedDates };
    results.forEach((sqlDate: any) => {
        newMarkedDates[sqlDate.date] = { marked: true, dotColor: 'green' };
    });
    setMarkedDates(newMarkedDates);

    // Update workouts by date
    setWorkoutsByDate({
        ...workoutByDate,
        [dateStr]: newSet
    });


        
}