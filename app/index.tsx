import React from "react";
import { View } from "react-native";
import App from "../src/app";

export default function Index() {
  return (
<View style={{flex:1}}>
    <App/>
    </View>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },

    row: {
    flexDirection: 'row',
    //justifyContent: 'space-between', // left and center alignment
    alignItems: 'center',
    marginBottom: 1,
  },

    row_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap', // wrap many stats to next line
  },

  text_left: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  
    text_center: {
    marginLeft: 100,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'justify'
  }
})
*/
// cmd command to get this bullshit to work (npx expo start --tunnel)
