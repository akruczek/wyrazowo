import * as React from 'react'
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

interface Props {
  min: number;
  max: number;
  low: number;
  high: number;
  step: number;
  onValueChanged: (low: number, high: number) => void;
  renderThumb: (name: 'low' | 'high') => React.ReactNode;
  renderRail: () => React.ReactNode;
  renderRailSelected: () => React.ReactNode;
  renderLabel: (value: number) => React.ReactNode;
  renderNotch: () => React.ReactNode;
  floatingLabel?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const RangeSlider = ({
  min,
  max,
  low,
  high,
  step,
  onValueChanged,
  renderThumb,
  renderRail,
  style,
}: Props) => {
  const trackWidth = useSharedValue(0)
  const lowX = useSharedValue(0)
  const highX = useSharedValue(0)
  const startLowX = useSharedValue(0)
  const startHighX = useSharedValue(0)

  const valueToX = (value: number, width: number) => {
    if (width <= 0 || max === min) return 0
    return ((value - min) / (max - min)) * width
  }

  const xToValue = (x: number, width: number) => {
    if (width <= 0 || max === min) return min
    const raw = min + (x / width) * (max - min)
    const stepped = Math.round(raw / step) * step
    return Math.min(Math.max(stepped, min), max)
  }

  React.useEffect(() => {
    if (!trackWidth.value) return
    lowX.value = valueToX(low, trackWidth.value)
    highX.value = valueToX(high, trackWidth.value)
    // Shared values are stable refs; only re-sync when external props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ low, high, min, max ])

  const emitChange = (nextLowX: number, nextHighX: number, width: number) => {
    const nextLow = xToValue(nextLowX, width)
    const nextHigh = xToValue(nextHighX, width)
    onValueChanged(Math.min(nextLow, nextHigh), Math.max(nextLow, nextHigh))
  }

  const lowGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet'
      startLowX.value = lowX.value
    })
    .onUpdate(event => {
      'worklet'
      const next = Math.min(Math.max(startLowX.value + event.translationX, 0), highX.value)
      lowX.value = next
      runOnJS(emitChange)(next, highX.value, trackWidth.value)
    })

  const highGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet'
      startHighX.value = highX.value
    })
    .onUpdate(event => {
      'worklet'
      const next = Math.min(
        Math.max(startHighX.value + event.translationX, lowX.value),
        trackWidth.value,
      )
      highX.value = next
      runOnJS(emitChange)(lowX.value, next, trackWidth.value)
    })

  const lowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: lowX.value - 12 }],
  }))

  const highStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: highX.value - 12 }],
  }))

  const selectedStyle = useAnimatedStyle(() => ({
    left: lowX.value,
    width: Math.max(highX.value - lowX.value, 0),
  }))

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    trackWidth.value = width
    lowX.value = valueToX(low, width)
    highX.value = valueToX(high, width)
  }

  return (
    <View style={[ styles.container, style ]} onLayout={onLayout}>
      <View style={styles.rail}>{renderRail()}</View>
      <Animated.View style={[ styles.selected, selectedStyle ]} />
      <GestureDetector gesture={lowGesture}>
        <Animated.View style={[ styles.thumb, lowStyle ]}>
          {renderThumb('low')}
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={highGesture}>
        <Animated.View style={[ styles.thumb, highStyle ]}>
          {renderThumb('high')}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  rail: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  selected: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
