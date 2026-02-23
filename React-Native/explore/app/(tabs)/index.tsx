import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export default function HomeScreen() {


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Add the translation to the saved offset
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      // If the square is within circle then animate to the center of the circle else keep it wherever it is
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < 150) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        offsetX.value = 0;
        offsetY.value = 0;
      } else {
        // Save the current position for the next gesture
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
      }
    });


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  })


  return (

     <View style={styles.container}>
      <View style={styles.circle}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </GestureDetector>
      </View>
     </View>
      
     

      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'white',
  },
});
