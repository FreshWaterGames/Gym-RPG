import { Image } from 'expo-image'
import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { User } from '../Classes/user.types'
import { styles } from '../styles'

export const Stats=({curUser, setCurView}: {curUser : User, setCurView: (curView: number) =>  void})=>{
    //Test Percentage 
    const [viewPercent, setPercent] = useState(65)
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
                    </View>
                    <View style={styles.xpBar}>
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
                    <View key={muscleName}>
                        <Text style={
                            styles.statsTxt
                        }>{muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}: {lvl}</Text>
                    </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}