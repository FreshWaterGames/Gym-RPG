import CheckBox from 'expo-checkbox'
import { SQLiteDatabase } from 'expo-sqlite'
import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { MuscleGroup, User } from '../Classes/user.types'
import { updateUserData } from '../database/userData'

import { styles } from '../styles'

export const Workout= ({curUser, setCurUser, db}: {curUser : User, setCurUser : (user: User) => void, db: SQLiteDatabase}) => {
    // manages the checked box value of muscle group values
    const [checkedMuscles, setCheckedMuscles] = useState<{[key: string]: boolean}>({});
    // saves the string value of the checked box
    const [muscleString, setMuscleString] = useState('');
    
    return(
        <View>
            <View style={{
                flexDirection: "row",
                }}>

                <TextInput style={styles.input}
                placeholder="Sets"
                placeholderTextColor={"grey"}
                keyboardType="default"
                >
                </TextInput>

                <TextInput style={styles.input}
                placeholder="Reps"
                placeholderTextColor={"grey"}
                keyboardType="default"
                >
                </TextInput>

                <TextInput style={styles.input}
                placeholder="Weight"
                placeholderTextColor={"grey"}
                keyboardType="default"
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


            
            <View> 
                <TouchableOpacity 
                        style={styles.tabsButton}
                        onPress={() => {
                            // sets the correct muscle group to update then updates it
                            setCurUser({
                                ...curUser,
                                stats: {
                                    ...curUser.stats, [muscleString]: curUser.stats[muscleString as keyof MuscleGroup] + 1
                                }
                            });
                            console.log(muscleString);
                            updateUserData(db, muscleString, curUser.stats[muscleString as keyof MuscleGroup] + 1)}}>
                        <Text style={styles.tabsButtonTxt}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}