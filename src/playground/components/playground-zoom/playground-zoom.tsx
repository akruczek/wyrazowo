import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PLAYGROUND_SPACING_MULTIPLIER } from '../playground-field/playground-field.styled'

interface Props {
  children: React.ReactNode;
}

export const PlaygroundZoom = ({ children }: Props) => {
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const savedTranslateX = useSharedValue(0)
  const savedTranslateY = useSharedValue(0)

  const pinch = Gesture.Pinch()
    .onUpdate(event => {
      const next = savedScale.value * event.scale
      scale.value = Math.min(Math.max(next, 1), PLAYGROUND_SPACING_MULTIPLIER)
    })
    .onEnd(() => {
      savedScale.value = scale.value
      if (scale.value <= 1) {
        translateX.value = 0
        translateY.value = 0
        savedTranslateX.value = 0
        savedTranslateY.value = 0
      }
    })

  const pan = Gesture.Pan()
    .minDistance(10)
    .averageTouches(true)
    .onUpdate(event => {
      if (scale.value <= 1) {
        return
      }

      translateX.value = savedTranslateX.value + event.translationX
      translateY.value = savedTranslateY.value + event.translationY
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })

  const composed = Gesture.Simultaneous(pinch, pan)

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[ styles.container, style ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
})
