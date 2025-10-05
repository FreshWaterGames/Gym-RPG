import { Image } from 'expo-image'
import React from "react"
import { ScrollView, Text, View } from "react-native"
import { styles } from '../styles'
import { User } from '../types/user.types'

export const Stats=({curUser, setCurView}: {curUser : User, setCurView: (curView: number) =>  void})=>{
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