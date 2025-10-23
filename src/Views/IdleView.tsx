import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from "react-native"
import { Monster } from '../Classes/monster.types'
import { User } from '../Classes/user.types'
import { getSpecificVal, updateUserData } from '../database/userData'


const temp_Monster: Monster = {
    health: 30,
    level: 1
}
export const IdleView = ({curUser, setCurUser}: {curUser : User, setCurUser: (curUser: User) => void}) => {
    const [curMontser, setMonster] = useState<Monster>(temp_Monster)
    return(
        <View>
            <Text style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                paddingTop: 20
            }}>Health: {curMontser.health}</Text>
            <TouchableOpacity
            onPress={async() => {
                const newHealth = curMontser.health - 1
                    setMonster({
                        ...curMontser,
                        health: newHealth
    
                    })
                
                {if (newHealth == 0){
                    try{
                    const lastXP = await getSpecificVal('xpToLevel')
                    
                    //Const for xp calc
                    const xpWeight = 15 * 2.39
                    const xpCalc = Number(Math.round((xpWeight * curMontser.level) + lastXP))

                    //need to check if can level up 
                    if(levelCheck(xpCalc, curUser.xpMax) == false){
                        updateUserData('xpToLevel', xpCalc)
                        setCurUser({
                            ...curUser,
                            xpToLevel: xpCalc
                        })
                    }
                    else{
                        levelUp(curUser, setCurUser)
                    }

                    setMonster({
                        ...curMontser,
                        health: 30
                    })
                } catch(error){
                    console.log(error)
                }
                }}         
            }}>
                <Text style={{
                    fontSize: 250,
                    textAlign: 'center'
                    }}>🧌</Text>
            </TouchableOpacity>
        </View>
    )
}


const levelCheck = (xpToLevel: number, xpMax: number) => {
    if(xpToLevel >= xpMax){
        return true
    }
    return false
}

const levelUp = (curUser: User, setCurUser: (curUser: User) => void) => {
    updateUserData('level', curUser.level + 1)
    updateUserData('xpToLevel', 0)
    const nextXP = Math.pow(curUser.level, 3)
    updateUserData('xpMax', nextXP)
    
    //Zack will set fr xp

    setCurUser({
        ...curUser,
        level: curUser.level + 1,
        xpToLevel: 0,
        xpMax: nextXP
    })
}