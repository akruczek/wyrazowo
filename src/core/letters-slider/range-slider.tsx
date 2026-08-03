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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

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
  const [ width, setWidth ] = React.useState(0)
  const lowX = useSharedValue(0)
  const highX = useSharedValue(0)
  const startLowX = useSharedValue(0)
  const startHighX = useSharedValue(0)

  const valueToX = React.useCallback((value: number, trackWidth: number) => {
    if (trackWidth <= 0 || max === min) return 0
    return ((value - min) / (max - min)) * trackWidth
  }, [ min, max ])

  const xToValue = React.useCallback((x: number, trackWidth: number) => {
    if (trackWidth <= 0 || max === min) return min
    const raw = min + (x / trackWidth) * (max - min)
    const stepped = Math.round(raw / step) * step
    return clamp(stepped, min, max)
  }, [ min, max, step ])

  React.useEffect(() => {
    if (!width) return
    lowX.value = valueToX(low, width)
    highX.value = valueToX(high, width)
    // Shared values are stable refs; only re-sync when external props/layout change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ low, high, width, valueToX ])

  const emitChange = (nextLowX: number, nextHighX: number) => {
    const nextLow = xToValue(nextLowX, width)
    const nextHigh = xToValue(nextHighX, width)
    onValueChanged(Math.min(nextLow, nextHigh), Math.max(nextLow, nextHigh))
  }

  const lowGesture = Gesture.Pan()
    .onBegin(() => {
      startLowX.value = lowX.value
    })
    .onUpdate(event => {
      const next = clamp(startLowX.value + event.translationX, 0, highX.value)
      lowX.value = next
      runOnJS(emitChange)(next, highX.value)
    })

  const highGesture = Gesture.Pan()
    .onBegin(() => {
      startHighX.value = highX.value
    })
    .onUpdate(event => {
      const next = clamp(startHighX.value + event.translationX, lowX.value, width)
      highX.value = next
      runOnJS(emitChange)(lowX.value, next)
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
    setWidth(event.nativeEvent.layout.width)
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
