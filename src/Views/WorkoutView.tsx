import CheckBox from 'expo-checkbox'
import { SQLiteDatabase } from 'expo-sqlite'
import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { User } from '../Classes/user.types'
import { styles } from '../styles'

export const Workout= ({curUser, setCurUser, db}: {curUser : User, setCurUser : (user: User) => void, db: SQLiteDatabase}) => {
    const [checkVal, setChecked] = useState(false)
    
    return(
        <View>
            <View style={{
                flexDirection: "row",
                }}>

                <TextInput style={styles.input}
                placeholder="Sets"
                placeholderTextColor={"grey"}
                keyboardType="default" // prefer to be numeric but need to code in a way to lower keybaord after it appears :I
                //value={printer}
                //onChangeText={(text)=>setPrinter(text)}
                >
                </TextInput>

                <TextInput style={styles.input}
                placeholder="Reps"
                placeholderTextColor={"grey"}
                keyboardType="default" // prefer to be numeric but need to code in a way to lower keybaord after it appears :I
                >
                </TextInput>

                <TextInput style={styles.input}
                placeholder="Weight"
                placeholderTextColor={"grey"}
                keyboardType="default" // prefer to be numeric but need to code in a way to lower keybaord after it appears :I
                >
                </TextInput>
            </View>

            <View>

                {Object.entries(curUser.stats).map(([muscleName]) => { 
                                    return(
                                    <View key={muscleName} style={{flexDirection: 'row', padding: 3, }}>
                                        <Text style={
                                            styles.statsTxt
                                        }>{muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}</Text>
                                        
                                        <CheckBox
                                            value={checkVal}
                                            onValueChange={setChecked}
                                            //style={styles.checkbox}
                                            //color={isChecked ? '#4630EB' : undefined} // Optional: custom color when checked
                                        />

                                        <Text></Text>


                                    </View>
                                    )
                                })}
            </View>
        </View>

        
    )
}