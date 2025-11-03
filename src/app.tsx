import React, { useCallback, useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { User } from './Classes/user.types'
import { addUser, connectToDatabase, createTables, getUserData } from "./database/userData"
import { styles } from './styles'
import { IdleView } from "./Views/IdleView"
import { Stats } from './Views/StatsView'
import { Workout } from "./Views/WorkoutView"

//Test User
const TEMP_USER: User ={
    id: '',
    username: 'Zack',
    level: 1,
    heatlh: 30,
    xpMax: 1,
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
        obliques: 1,
    },
    xpToLevel: 1
}

const App = () => {
    const [curUser, setUser] = useState<User>(TEMP_USER) // user object
    const [curView, setView] = useState<number>(0) // Which screen state is being shown
    const [isLoading, setLoading] = useState<Boolean>(true)
    //const [db, setDB] = useState<SQLiteDatabase | null>(null)

    const renderView = () => {
        switch(curView){
            case 0:
                if (isLoading == false){
                    return <Stats curUser={curUser} setCurUser={setUser}/>
                }
            case 1: 
                return <Workout curUser={curUser} setCurUser={setUser}/>
            case 2: 
                return <IdleView curUser={curUser} setCurUser={setUser}/>
            case 3: 
                return <SettingView curUser={curUser} setCurUser={setUser}/>
        }
    }

    //For Database both functions are in userData file
    //in database folder
    const loadData = useCallback(async () => {
        try{
            const db = await connectToDatabase()
            await createTables()
            await addUser(curUser)
            //await getTable(db)
           const tempUser = await getUserData()
           if(tempUser != null){
            //console.log(tempUser)
            setLoading(false)
            setUser(tempUser)
           }
        } catch(error) {
            console.log(error)
            throw Error("Somehting went wrong in loadData")
        }
    }, [])
    
    useEffect(() =>{
        loadData()
    }, [loadData])


    
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
                    onPress={() => setCurView(0)}>
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
                    <Text style={styles.tabsButtonTxt} >Idle</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabsButton}
                    onPress = {() => setCurView(3)}>
                    <Text style={styles.tabsButtonTxt} >Settings</Text>
                </TouchableOpacity>
        </View>
    )
}


export const SettingView = ({curUser, setCurUser}: {curUser : User, setCurUser : (user: User) => void }) => {
    return(
        <View>
            <Text
            style={{
                fontSize: 16
            }}
            >Da Finky</Text>
        </View>
    )
}


export default App;