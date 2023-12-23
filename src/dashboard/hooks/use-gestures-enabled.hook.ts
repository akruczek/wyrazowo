import * as React from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { isPlatform } from "@core/is-platform/is-platform"
import { noop } from "@core/noop/noop"

interface UseGesturesEnabled {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  panGestureEnabled: boolean;
}

// Walk-around for android gestures issues when back from background
export const useGesturesEnabled = (): UseGesturesEnabled => {
  const [ panGestureEnabled, setPanGestureEnabled ] = React.useState(true)

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (panGestureEnabled && event.nativeEvent.contentOffset.y) {
      setPanGestureEnabled(false)
    }

    if (!panGestureEnabled && !event.nativeEvent.contentOffset.y) {
      setPanGestureEnabled(true)
    }
  }

  return {
    onScroll: isPlatform("android") ? onScroll : noop,
    panGestureEnabled
  }
}
