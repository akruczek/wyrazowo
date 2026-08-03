import * as React from 'react'
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { THUMB_SIZE } from './components/letter-slider-thumb/letter-slider-thumb.styled'

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

const THUMB_RADIUS = THUMB_SIZE / 2

const snapToStepX = (
  x: number,
  width: number,
  rangeMin: number,
  rangeMax: number,
  stepSize: number,
) => {
  'worklet'
  if (width <= 0 || rangeMax === rangeMin) return 0
  const raw = rangeMin + (x / width) * (rangeMax - rangeMin)
  const stepped = Math.round(raw / stepSize) * stepSize
  const value = Math.min(Math.max(stepped, rangeMin), rangeMax)
  return ((value - rangeMin) / (rangeMax - rangeMin)) * width
}

const xToSteppedValue = (
  x: number,
  width: number,
  rangeMin: number,
  rangeMax: number,
  stepSize: number,
) => {
  'worklet'
  if (width <= 0 || rangeMax === rangeMin) return rangeMin
  const raw = rangeMin + (x / width) * (rangeMax - rangeMin)
  const stepped = Math.round(raw / stepSize) * stepSize
  return Math.min(Math.max(stepped, rangeMin), rangeMax)
}

const valueToX = (value: number, width: number, rangeMin: number, rangeMax: number) => {
  if (width <= 0 || rangeMax === rangeMin) return 0
  return ((value - rangeMin) / (rangeMax - rangeMin)) * width
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
  const lastLow = useSharedValue(low)
  const lastHigh = useSharedValue(high)
  const isDragging = useSharedValue(false)

  React.useEffect(() => {
    if (isDragging.value || !trackWidth.value) return
    lowX.value = valueToX(low, trackWidth.value, min, max)
    highX.value = valueToX(high, trackWidth.value, min, max)
    lastLow.value = low
    lastHigh.value = high
    // Shared values are stable refs; only re-sync when external props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ low, high, min, max ])

  const emitChange = (nextLow: number, nextHigh: number) => {
    onValueChanged(nextLow, nextHigh)
  }

  const lowGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet'
      isDragging.value = true
      startLowX.value = lowX.value
    })
    .onUpdate(event => {
      'worklet'
      const width = trackWidth.value
      const rawX = Math.min(Math.max(startLowX.value + event.translationX, 0), highX.value)
      const snappedX = snapToStepX(rawX, width, min, max, step)
      lowX.value = Math.min(snappedX, highX.value)

      const nextLow = xToSteppedValue(lowX.value, width, min, max, step)
      const nextHigh = xToSteppedValue(highX.value, width, min, max, step)
      if (nextLow !== lastLow.value || nextHigh !== lastHigh.value) {
        lastLow.value = nextLow
        lastHigh.value = nextHigh
        runOnJS(emitChange)(nextLow, nextHigh)
      }
    })
    .onFinalize(() => {
      'worklet'
      isDragging.value = false
    })

  const highGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet'
      isDragging.value = true
      startHighX.value = highX.value
    })
    .onUpdate(event => {
      'worklet'
      const width = trackWidth.value
      const rawX = Math.min(Math.max(startHighX.value + event.translationX, lowX.value), width)
      const snappedX = snapToStepX(rawX, width, min, max, step)
      highX.value = Math.max(snappedX, lowX.value)

      const nextLow = xToSteppedValue(lowX.value, width, min, max, step)
      const nextHigh = xToSteppedValue(highX.value, width, min, max, step)
      if (nextLow !== lastLow.value || nextHigh !== lastHigh.value) {
        lastLow.value = nextLow
        lastHigh.value = nextHigh
        runOnJS(emitChange)(nextLow, nextHigh)
      }
    })
    .onFinalize(() => {
      'worklet'
      isDragging.value = false
    })

  const lowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: lowX.value - THUMB_RADIUS }],
  }))

  const highStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: highX.value - THUMB_RADIUS }],
  }))

  const selectedStyle = useAnimatedStyle(() => ({
    left: lowX.value,
    width: Math.max(highX.value - lowX.value, 0),
  }))

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    trackWidth.value = width
    lowX.value = valueToX(low, width, min, max)
    highX.value = valueToX(high, width, min, max)
  }

  return (
    <View style={[ styles.container, style ]}>
      <View style={styles.track} onLayout={onLayout}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: THUMB_SIZE,
    justifyContent: 'center',
    // Keep edge thumbs fully visible inside the parent padding.
    paddingHorizontal: THUMB_RADIUS,
  },
  track: {
    flex: 1,
    height: '100%',
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
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
