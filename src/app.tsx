import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { User } from './types/user.types'

const TEMP_USER: User ={
    id: '',
    username: 'Zack',
    stats: {
        chest: 1,
        bicep: 1,
    tricep: 1,
    delts: 1,
    lats: 1,
    traps: 1,
    quads: 1,
    glutes: 1,
    calfs: 1,
    hamstring: 1,
    abs: 1,
    obleques: 1
    }
}

const App = () => {
    const [curUser, setUser] = useState<User>(TEMP_USER)

    return <Stats curUser={curUser}/>
}

export const Stats=({curUser}: {curUser : User})=>{
    return(
        <View>
            <Text style={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold'
            }}>{curUser.username}</Text>
            <ScrollView style={{
                backgroundColor: ''
            }}>
                {Object.entries(curUser.stats).map(([muscleName, lvl]) => {
                    return(
                    <View key={muscleName}>
                        <Text>{muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}: {lvl}</Text>
                    </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default App;