import CheckBox from 'expo-checkbox'
import { SQLiteDatabase } from 'expo-sqlite'
import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { User } from '../Classes/user.types'
import { styles } from '../styles'

export const Workout= ({curUser, setCurUser, db}: {curUser : User, setCurUser : (user: User) => void, db: SQLiteDatabase}) => {
    const [checkedMuscles, setCheckedMuscles] = useState<{[key: string]: boolean}>({});
    
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
                                onValueChange={(newValue) => 
                                    setCheckedMuscles(prev => ({...prev, [muscleName]: newValue}))
                                }
                            />
                        </View>
                    )
                })}
            </View>
        </View>
    )
}