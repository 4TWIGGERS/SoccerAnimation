import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import SoccerBalls from "./SoccerBalls";

const { width, height } = Dimensions.get("screen");
const cards = [
  require("../../assets/card1.png"),
  require("../../assets/card2.png"),
  require("../../assets/card3.png"),
];

const SoccerAnimation = () => {
  const [toggle, setToggle] = useState(true);
  const [goalScore, setGoalScore] = useState(0);

  const isToggled = useSharedValue(0);

  useEffect(() => {
    isToggled.value = toggle ? 1 : 0;
  }, [toggle]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/stadium.png")}
        resizeMode="stretch"
        style={styles.imageBg}
      >
        <View style={styles.scoreCont}>
          <Text style={styles.score}>{goalScore}</Text>
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/door1.png")}
        ></Image>
        {cards.map((card, index) => {
          return (
            <SoccerBalls
              setGoalScore={setGoalScore}
              card={require("../../assets/ball1.png")}
              index={index}
              goalScore={goalScore}
              isToggled={isToggled}
              key={index}
            />
          );
        })}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  scoreCont: { position: "absolute", top: 40, right: 40 },
  score: { fontSize: 34, fontWeight: "500", color: "white" },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    bottom: 100,
  },
  cards: {
    height: 200,
    width: 200,
  },
  imageBg: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: width * 0.35,
    position: "absolute",
    top: 40,
  },
});

export default SoccerAnimation;
