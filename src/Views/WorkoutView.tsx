import CheckBox from 'expo-checkbox'
import React, { useState } from "react"
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
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
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View>
                <View style={{flexDirection: "row", marginBottom: 10}}>

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
                    >
                    </TextInput>

                    <TextInput style={styles.input}
                    placeholder="Weight"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    value={weightVal}
                    onChangeText={setWeightVal}
                    >
                    </TextInput>
                </View>


                {/* Muslce Buttons */}
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
                                        // maybe sets the checkbox to true or false??
                                        //setCheckedMuscles(prev => ({...prev, [muscleName]: newValue}))

                                        // checked muscle gives out muscle xp
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
                                
                                const finalVal = finalCalc(setsVal, repsVal, weightVal) 

                                const newMuscleValue = Number(curUser.stats[muscleString as keyof MuscleGroup] + finalVal)

                                setCurUser({
                                    ...curUser, stats: {
                                        ...curUser.stats, [muscleString]: newMuscleValue
                                    }
                                });

                                console.log(muscleString);

                                // data update
                                updateUserData(muscleString, newMuscleValue)

                                // Clear all inputs
                                setSetsVal('');
                                setRepVal('');
                                setWeightVal('');
                                setCheckedMuscles({});
                                setMuscleString('');
                                
                                }}>

                            <Text style={styles.updateButtonTxt}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const finalCalc = (sets: string, reps: string, weight:string) => {
    
    const setsValue = Number(sets);
    const repsValue = Number(reps);
    const weightValue = Number(weight);

    return (setsValue + repsValue) + weightValue

    // need xp max for muscles
}