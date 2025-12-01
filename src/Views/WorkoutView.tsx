import CheckBox from 'expo-checkbox';
import React, { useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { MuscleGroup, MuscleGroupXP, User } from '../Classes/user.types';
import { updateUserData } from '../database/userData';
import { checkMuscleLvlUp, muscleXPMax } from "../Helper/userHelper";
import { styles } from '../styles';

// Temp workout data storing till database stuff blah blah blah
type WorkoutEntry = {
    muscle: string;
    sets: string;
    reps: string;
    weight: string;
    timestamp: number;
};
export const Workout = ({curUser, setCurUser}: {curUser : User, setCurUser : (user: User) => void}) => {
    // Current view state
    const [currView, setCurrView] = useState<Number>(0); // Which screen state is being shown
    
    // Workout form states
    const [checkedMuscles, setCheckedMuscles] = useState<{[key: string]: boolean}>({});
    // saves the string value of the checked box
    const [muscleString, setMuscleString] = useState('');

    const [setsVal, setSetsVal] = useState('');
    const [repsVal, setRepVal] = useState('');
    const [weightVal, setWeightVal] = useState('');
    const [savedWorkout, setSavedWorkout] = useState('');

    // Calendar states
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState<{[key: string]: any}>({});

    // date as the key
    const [workoutsByDate, setWorkoutsByDate] = useState<{[key: string]: WorkoutEntry[]}>({});
    
    
    
   const renderWorkoutView = () => (
        <View>
            <View style={{
                flexDirection: "row",
                }}>

                <TextInput style={styles.input}
                placeholder="Sets"
                placeholderTextColor={"grey"}
                keyboardType="default"
                value={setsVal}
                onChangeText={setSetsVal}
                >
                </TextInput>

                <TextInput style={styles.input}
                    placeholder="Reps"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={repsVal}
                    onChangeText={setRepVal}
                />

                <TextInput style={styles.input}
                    placeholder="Weight"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={weightVal}
                    onChangeText={setWeightVal}
                />
            </View>

            {/* Muscle Buttons */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 100}}>
                {Object.entries(curUser.stats).map(([muscleName]) => { 
                    return(
                        <View 
                            key={muscleName} 
                            style={styles.checkBox}
                        >
                            <Text style={styles.checkboxTxt}>
                                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}
                            </Text>
                            
                            <CheckBox
                                value={checkedMuscles[muscleName] || false}
                                onValueChange={(newValue) => {
                                    if (newValue) {
                                        setCheckedMuscles({ [muscleName]: true});
                                        setMuscleString(muscleName);
                                    } else {
                                        setCheckedMuscles({});
                                        setMuscleString('')
                                    }
                                }}
                            />
                        </View>
                    )
                })}
            </View>

            {/* Update button */}
            <View> 
                <TouchableOpacity 
                    style={styles.updateButton}
                    onPress={() => {
                        const finalVal = finalCalc(setsVal, repsVal, weightVal);
                        const newMuscleValue = Number(curUser.stats[muscleString as keyof MuscleGroup] + finalVal);

                        // data update
                        updateStats(curUser, setCurUser,newMuscleValue, muscleString)

                        //This needs to move to another file or atleast its own function
                        // mark date on calander
                        const now = new Date();
                        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

                        const entry: WorkoutEntry = {
                            muscle: muscleString,
                            sets: setsVal,
                            reps: repsVal,
                            weight: weightVal,
                            timestamp: Date.now()
                        };

                        setWorkoutsByDate(prev => ({
                            ...prev,
                            [today]: [...(prev[today] || []), entry]
                        }));


                        setMarkedDates({
                            ...markedDates,
                            [today]: { marked: true, dotColor: 'green'}
                        });

                        // Clear all inputs
                        setSetsVal('');
                        setRepVal('');
                        setWeightVal('');
                        setCheckedMuscles({});
                        setMuscleString('');
                    }}
                >
                    <Text style={styles.updateButtonTxt}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Render the calendar view
    const renderCalendarView = () => (
        <View>
            <Calendar
                onDayPress={(day) => { // built in stuff from calander libary
                    setSelectedDate(day.dateString);
                }}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: { selected: true, selectedColor: 'lightblue' }
                }}
                theme={{
                    selectedDayBackgroundColor: '#007AFF',
                    todayTextColor: '#007AFF',
                    arrowColor: '#007AFF',
                }}
            />
            
            <View>
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                    Selected: {selectedDate}
                </Text>

                {workoutsByDate[selectedDate] && workoutsByDate[selectedDate].length > 0 ? ( // weird ass if statement 
                            <ScrollView style={{ maxHeight: 300 }}>
                                {workoutsByDate[selectedDate].map((workout, index) => (
                                    <View 
                                        key={index} 
                                        style={{ 
                                            backgroundColor: '#f0f0f0', 
                                            padding: 15, 
                                            marginBottom: 10, 
                                            borderRadius: 8 
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                                            {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>
                                            Sets: {workout.sets} | Reps: {workout.reps} | Weight: {workout.weight} lbs
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={{ color: 'grey', fontStyle: 'italic' }}>
                                No workouts recorded for this date
                            </Text>
                        )}
            </View>
        </View>
    );

    // Render views
    const renderCurrentView = () => {
        switch (currView) {
            case 0:
                return renderWorkoutView();
            case 1:
                return renderCalendarView();
            default:
                return renderWorkoutView();
        }
    };

    // view switching button
    const renderNavigationButtons = () => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

            <TouchableOpacity style={styles.tabsButton} onPress={() => setCurrView(0)}>
                <Text style={styles.tabsButtonTxt}>Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsButton} onPress={() => setCurrView(1)}>
                <Text style={styles.tabsButtonTxt}>Calendar</Text>
            </TouchableOpacity>
        </View>
    );
    
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View>
                {renderCurrentView()}
                {renderNavigationButtons()}
            </View>
        </TouchableWithoutFeedback>
    )
}

const finalCalc = (sets: string, reps: string, weight: string) => {
  const setsValue = Number(sets);
  const repsValue = Number(reps);
  const weightValue = Number(weight);

  const xpMultiplier = 0.2;
  return setsValue * repsValue * weightValue * xpMultiplier;

  // need xp max for muscles
};


//this needs to be in a new file maybe userHelper or specific file
const updateStats = async (curUser: User, setUser: (user: User) => void, muscleVal: number, muscleStr: string
) => {
  const muscleXP = muscleStr + "XP";
  let newXP = curUser.statsXP[muscleXP as keyof MuscleGroupXP] + muscleVal;
  let xpMax = muscleXPMax(curUser.stats[muscleStr as keyof MuscleGroup]);
  
  //do{
  //If user didnt level up just update
  if (checkMuscleLvlUp(newXP, xpMax) == false) {
    setUser({
      ...curUser,
      statsXP: {
        ...curUser.statsXP,
        [muscleXP]: newXP,
      },
    });

    //console.log(muscleString);
    // data update
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
  //} while(checkMuscleLvlUp(newXP, xpMax) == true)
};
