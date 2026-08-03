import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface Props {
  x: number;
  y: number;
  onDragRelease: (event: { nativeEvent: { pageX: number; pageY: number } } | import('react-native').GestureResponderEvent) => void;
  shouldReverse?: boolean;
  children: React.ReactNode;
}

export const DraggableLetter = ({ x, y, onDragRelease, shouldReverse = true, children }: Props) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const startX = useSharedValue(0)
  const startY = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value
      startY.value = translateY.value
    })
    .onUpdate(event => {
      translateX.value = startX.value + event.translationX
      translateY.value = startY.value + event.translationY
    })
    .onEnd(event => {
      runOnJS(onDragRelease)({
        nativeEvent: {
          pageX: event.absoluteX,
          pageY: event.absoluteY,
        },
      })

      if (shouldReverse) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    })

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: 10,
  }))

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[ styles.base, { left: x, top: y }, style ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
  },
})
