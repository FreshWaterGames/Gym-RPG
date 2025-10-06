import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { User } from './Classes/user.types'
import { styles } from './styles'
import { Stats } from './Views/StatsView'


//Test User
const TEMP_USER: User ={
    id: '',
    username: 'Zack',
    level: 1,
    heatlh: 30,
    stats: {
        chest: 15,
        bicep: 17,
        tricep: 1,
        delts: 37,
        lats: 7,
        traps: 19,
        quads: 1,
        glutes: 7,
        calfs: 6,
        hamstring: 1,
        abs: 1,
        obleques: 1
    }
}

const App = () => {
    const [curUser, setUser] = useState<User>(TEMP_USER)
    const [curView, setView] = useState<number>(0)

    const renderView = () => {
        switch(curView){
            case 0:
                return <Stats curUser={curUser} setCurView={setView}/>
            case 1: 
                return <WorkoutView curUser={curUser} setCurUser={setUser}/>
        }
    }

    return(
        <View style={{flex: 1}}>
            {renderView()}
            <TabBar setCurView = {setView}/>
        </View>
    )
}
    
export const TabBar = ({setCurView} : {setCurView: (curView: number) => void}) => {
    return (
        <View style={styles.tabs}>
            <TouchableOpacity 
                    style={styles.tabsButton}
                    onPress={() => setCurView(0)}
                >
                    <Text style={styles.tabsButtonTxt}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabsButton}
                    onPress = {() => setCurView(1)}>
                    <Text style={styles.tabsButtonTxt} >Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabsButton}
                    onPress = {() => setCurView(2)}>
                    <Text style={styles.tabsButtonTxt} >Settings</Text>
                </TouchableOpacity>
        </View>
    )
}
export const WorkoutView = ({curUser, setCurUser}: {curUser : User, setCurUser : (user: User) => void }) => {
    return(
        <View>
            <Text
            style={{
                fontSize: 16
            }}
            >Yer nigga</Text>
        </View>
    )
}

export default App;