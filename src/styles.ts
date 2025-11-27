import { StyleSheet } from 'react-native';


//#007AFF Light Blue Color
//#0f172a Dark Blue

export const styles = StyleSheet.create({
    userInfo: {
        flex: 1,
        flexDirection: 'column',
        color: 'black',
    },

    nameTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
    },

    statsInfo: {
        flex: 1,
        padding: 30,
        borderRadius: 40,
        borderWidth: 20,
        borderColor: '#0f172a',
        borderBlockColor: '#0f172a',
        backgroundColor: 'white',
        height: '60%'
    },

    statsTxt: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: '#0f172a'
    },
    
    tabs: {
        position: 'absolute',
        bottom: '5%',
        backgroundColor: '#0f172a',
        flexDirection: "row",
        padding: 13,
        borderColor: 'white',
        borderRadius: 50,
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    
    tabsButton: {
        margin: 5,
        padding: 5,
        backgroundColor: '#007AFF',
        borderRadius: 12
        
    },

    tabsButtonTxt: {
    color: 'white',
    fontSize: 18,
    padding: 1
    },

    updateButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
    
    },

    updateButtonTxt: {
    color: 'white',
    fontSize: 40,
    padding: 1
    },

    pfp: {
        width: 75, 
        height: 75 ,      
        borderRadius: 50, 
        borderWidth: 2,       
        borderColor: 'white'
    },

    xpBar:{
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 10,
        height: 25,
        width: '90%',        // Full width of parent
        maxWidth: 300,
        zIndex: 0,
        position: 'relative'
    },
    xpText:{
        color: 'white',
        fontSize: 15,
        fontStyle: 'italic',
        position: 'relative',
        right: '0%',
        left: '45%',
        bottom: '90%'
    },
    xpText2:{
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
        position: 'relative',
        right: '0%',
        left: '45%',
        bottom: '90%'
    },
    input: {
        height: 40,
        width: '22.22%',
        margin: 20,
        borderWidth: 5,
        padding: 10,
    },
    
    checkBox: {
        flexDirection: 'row',
        padding: 3, 
        width: '33.33%',
        alignItems: 'center'
    },

    checkboxTxt: {
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        color: '#0f172a'
    },

    fadeView: {
        alignSelf: 'center',
        borderRadius: 20,
        color: 'white',
        backgroundColor: 'white'
    },

    fadeText: {
        fontSize: 15,
        padding: 10
    },

    LargeWorkoutButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 100
    },

    workoutEntires: {
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        marginBottom: 10, 
        borderRadius: 8 
    }

});
