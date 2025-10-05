import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    userInfo: {
        flex: 1,
        flexDirection: 'column',
        color: 'white',
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
        borderRadius: 4,
        borderColor: 'white'
    },

    statsTxt: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    
    tabs: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center',
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
    }

});
