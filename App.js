import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import SoccerAnimation from "./components/soccer/SoccerAnimation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SoccerAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
