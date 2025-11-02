import { Image } from 'expo-image'
import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { MuscleGroup, User } from '../Classes/user.types'
import { updateUserData } from '../database/userData'
import { styles } from '../styles'

export const Stats=({curUser, setCurUser}: {curUser : User, setCurUser: (curUser: User) =>  void})=>{
    //Need to have percentage where itd be based on the level 
    //Test Percentage 
    const [viewPercent, setPercent] = useState((curUser.xpToLevel/curUser.xpMax) * 100)
    return(
        <View style={{
            flex: 1,
            backgroundColor: '#0f172a',
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 2,
                backgroundColor: '#0f172a'
                }}>
                <Image 
                    source={require('../assets/images/pfp.png')}
                    style={styles.pfp}/>
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.nameTxt}>{curUser.username}</Text>
                        <Text style={styles.nameTxt}>HP: {curUser.heatlh}</Text>
                        <Text style={styles.nameTxt}>Level: {curUser.level}</Text>
                        <Text style={styles.nameTxt}>XP: {curUser.xpToLevel}</Text>
                    </View>
                    <View style={styles.xpBar} key={curUser.xpToLevel}>
                            <View style={{
                                backgroundColor: 'orange',
                                width: `${viewPercent}%`,
                                height: '100%'
                            }}
                            ></View>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.statsInfo}>
                {Object.entries(curUser.stats).map(([muscleName, lvl]) => {
                    return(
                    <View key={muscleName} style={{flexDirection: 'row', padding: 3}}>
                        <Text style={
                            styles.statsTxt
                        }>{muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}: {lvl}</Text>

                        <TouchableOpacity 
                        
                        onPress={() =>{
                            setCurUser({
                                //Button is temporary just to get SQL working
                                //Example of use it
                                ...curUser,
                                stats: {
                                    ...curUser.stats,
                                    [muscleName]: curUser.stats[muscleName as keyof MuscleGroup] + 1
                                }
                            }) 
                            updateUserData(muscleName, curUser.stats[muscleName as keyof MuscleGroup] + 1)
                        }}><Text style={{
                            padding: 5,
                            borderColor: 'black',
                            backgroundColor: '#0f172a',
                            color: 'white',
                            borderRadius: 5,
                            fontSize: 24
                        }}>+</Text></TouchableOpacity>
                    </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}