import CheckBox from 'expo-checkbox';
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { WorkoutData } from '../Classes/calender.types';
import { MuscleGroup, User } from '../Classes/user.types';
import { setWorkoutData, updateCalender } from '../Helper/calenderHelper';
import { updateStats } from "../Helper/userHelper";
import { styles } from '../styles';


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
    //const [savedWorkout, setSavedWorkout] = useState('');

    // Calendar states
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    });
    const [markedDates, setMarkedDates] = useState<{[key: string]: any}>({});

    // date as the key
    const [workoutsByDate, setWorkoutsByDate] = useState<{[key: string]: WorkoutData[]}>({});
    
    useEffect(() => {
        const loadData = async () => {
          await setWorkoutData(workoutsByDate, setWorkoutsByDate, markedDates, setMarkedDates, selectedDate);
        };
        loadData();
      }, [selectedDate]); //Dependency Array
    
   const renderWorkoutView = () => (
        <View>
            <View style={{
                flexDirection: "row",
                }}>

                <TextInput style={styles.input}
                placeholder="Sets"
                placeholderTextColor={"grey"}
                keyboardType="numeric"
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
            <View style={styles.LargeWorkoutButton}>
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
                        updateStats(curUser, setCurUser, newMuscleValue, muscleString)

                        //This needs to move to another file or atleast its own function
                        // mark date on calander
                        updateCalender(muscleString, setsVal, repsVal, weightVal, workoutsByDate, setWorkoutsByDate, markedDates, setMarkedDates)
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
                    [selectedDate]: { 
                        selected: true, 
                        selectedColor: 'lightblue'
                    }
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
                {/* If the selected Date is not null and there is something in it*/}
                {workoutsByDate[selectedDate] && workoutsByDate[selectedDate].length > 0 ? (
                            <ScrollView style={{ maxHeight: 300 }}>
                                {workoutsByDate[selectedDate].map((workout, index) => (
                                    <View 
                                        key={index} 
                                        style={styles.workoutEntires}
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



// functions --------------------------------------------------------------------------------------------

const finalCalc = (sets: string, reps: string, weight: string) => {
  const setsValue = Number(sets);
  const repsValue = Number(reps);
  const weightValue = Number(weight);

  const xpMultiplier = 0.2;
  return setsValue * repsValue * weightValue * xpMultiplier;

  // need xp max for muscles
};
