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
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },

    statsInfo: {
        flex: 1,
        padding: 25,
        borderRadius: 20,
        borderWidth: 16,
        borderColor: '#0f172a',
        borderBlockColor: '#0f172a',
        backgroundColor: 'white'
    },

    statsTxt: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: '#0f172a'
    },
    
    tabs: {
<<<<<<< Updated upstream
=======
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
>>>>>>> Stashed changes
        backgroundColor: '#0f172a',
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        borderColor: 'white'
    },
    
    tabsButton: {
        
        margin: 20,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5
        
    },
   
    
    tabsButtonTxt: {
        color: 'white',
        fontSize: 18
    },

    pfp: {
        width: 100, 
        height: 100 ,      
        borderRadius: 50, 
        borderWidth: 2,       
        borderColor: 'white'
<<<<<<< Updated upstream
=======
    },

    xpBar:{
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 10,
        height: 25,
        width: '100%',        // Full width of parent
        maxWidth: 300,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
>>>>>>> Stashed changes
    },

    xpBar:{
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 10,
        height: 25,
        width: '100%',        // Full width of parent
        maxWidth: 300,
    }
});
