import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text_left}>Zack</Text>
        <Text style={styles.text_center}>Hp: 10</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text_left}>LV: 1</Text>
        <Text style={styles.text_center}>Atk: 1</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text_left}>Gold: 0</Text>
        <Text style={styles.text_center}>Spd: 1</Text>
      </View>

      <Text style={styles.text_left}>Exp: 183/500</Text>

      <Text>{"\n"}</Text>

      <Text style={styles.text_left}>Chest: 1</Text>
      <Text style={styles.text_left}>Bicep: 1</Text>
      <Text style={styles.text_left}>Tricep: 1</Text>
      <Text style={styles.text_left}>Delts: 1</Text>
      <Text style={styles.text_left}>Lats: 1</Text>
      <Text style={styles.text_left}>Traps: 1</Text>
      <Text style={styles.text_left}>Quads: 1</Text>
      <Text style={styles.text_left}>Glutes: 1</Text>
      <Text style={styles.text_left}>Calfs: 1</Text>
      <Text style={styles.text_left}>Ham: 1</Text>
      <Text style={styles.text_left}>Upper Abs: 1</Text>
      <Text style={styles.text_left}>Lower Abs: 1</Text>
      <Text style={styles.text_left}>Obleques: 1</Text>
      

    </View>
  );
}

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

// cmd command to get this bullshit to work (npx expo start --tunnel)
