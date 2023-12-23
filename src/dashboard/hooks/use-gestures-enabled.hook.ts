import * as React from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { isPlatform } from "@core/is-platform/is-platform"
import { noop } from "@core/noop/noop"

interface UseGesturesEnabled {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  panGestureEnabled: boolean;
  resetFlag: boolean;
  setResetFlag: (flag: boolean) => void;
}

/**
 * Walk-around for gestures issues
 */
export const useGesturesEnabled = (): UseGesturesEnabled => {
  const [ panGestureEnabled, setPanGestureEnabled ] = React.useState(true)
  const [ resetFlag, setResetFlag ] = React.useState(true)

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
    panGestureEnabled,
    resetFlag,
    setResetFlag,
  }
}
