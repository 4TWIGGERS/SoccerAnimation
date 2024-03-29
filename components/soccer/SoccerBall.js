import React, { useEffect } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
  useAnimatedGestureHandler,
  withDecay,
  runOnJS,
} from "react-native-reanimated";
import { withBouncing } from "react-native-redash";
const { width, height } = Dimensions.get("window");
const BALL_HEIGHT = 60;

const SoccerBall = ({ index, card, goalScore, setGoalScore }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const bottom = useSharedValue(30);

  useDerivedValue(() => {
    if (
      translateY.value > -height - 300 &&
      translateY.value < -height + 160 &&
      translateX.value > -50 &&
      translateX.value < 60
    ) {
      translateY.value = withSpring(0);

      runOnJS(setGoalScore)(goalScore + 1);
    }
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.startX;
      translateY.value = event.translationY + ctx.startY;
    },

    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withBouncing(
        withDecay(
          {
            velocity: velocityY,
          },
          () => {}
        ),
        -height + BALL_HEIGHT / 2,
        0
      );

      translateX.value = withBouncing(
        withDecay(
          {
            velocity: velocityX,
          },
          () => {}
        ),
        -width / 2 + BALL_HEIGHT / 2,
        width / 2 - BALL_HEIGHT / 2
      );
    },
  });

  useEffect(() => {
    translateX.value = withSpring((index - 1) * 80);
  }, []);
  const style = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,

      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View key={index} style={[styles.overlay, style]}>
        <Image resizeMode="cover" style={styles.cards} source={card} />
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
  },
  cards: {
    height: BALL_HEIGHT,
    width: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT,
  },
});
export default SoccerBall;
