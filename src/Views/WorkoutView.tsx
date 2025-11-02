import CheckBox from 'expo-checkbox'
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { MuscleGroup, User } from '../Classes/user.types'
import { updateUserData } from '../database/userData'

import { styles } from '../styles'

export const Workout= ({curUser, setCurUser}: {curUser : User, setCurUser : (user: User) => void}) => {
    // manages the checked box value of muscle group values
    const [checkedMuscles, setCheckedMuscles] = useState<{[key: string]: boolean}>({});
    // saves the string value of the checked box
    const [muscleString, setMuscleString] = useState('');

    const [setsVal, setSetsVal] = useState('');
    const [repsVal, setRepVal] = useState('');
    const [weightVal, setWeightVal] = useState('');
    
    return(
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
                keyboardType="default"
                value={repsVal}
                onChangeText={setRepVal}
                >
                </TextInput>

                <TextInput style={styles.input}
                placeholder="Weight"
                placeholderTextColor={"grey"}
                keyboardType="default"
                value={weightVal}
                onChangeText={setWeightVal}
                >
                </TextInput>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                {Object.entries(curUser.stats).map(([muscleName]) => { 
                    return(
                        <View 
                            key={muscleName} 
                            style={styles.checkBox}
                        >
                            <Text style={styles.statsTxt}>
                                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}
                            </Text>
                            
                            <CheckBox
                                value={checkedMuscles[muscleName] || false}
                                onValueChange={(newValue) => {
                                    // maybe sets the checkbox to true or false??
                                    setCheckedMuscles(prev => ({...prev, [muscleName]: newValue}))
                                    // sets muscleString to be the current muscle name
                                    if (newValue) {
                                        setMuscleString(muscleName);
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
                        style={styles.tabsButton}
                        onPress={() => {
                            
                            const finalVal = finalCalc(setsVal, repsVal, weightVal) 

                            const newMuscleValue = Number(curUser.stats[muscleString as keyof MuscleGroup] + finalVal)

                            setCurUser({
                                ...curUser, stats: {
                                    ...curUser.stats, [muscleString]: newMuscleValue
                                }
                            });

                            console.log(muscleString);

                            // data update
                            updateUserData(muscleString, newMuscleValue)}}>

                        <Text style={styles.tabsButtonTxt}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const finalCalc = (sets: string, reps: string, weight:string) => {
    
    const setsValue = Number(sets);
    const repsValue = Number(reps);
    const weightValue = Number(weight);

    return (setsValue + repsValue) + weightValue

    // need xp max for muscles
}