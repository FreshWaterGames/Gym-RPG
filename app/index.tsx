import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import App from "../src/app";

export default function Index() {
  return (
<>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{flex: 1, paddingTop: 55, backgroundColor: "#0f172a"}}>
        <App/>
      </View>
    </>
  );
}
