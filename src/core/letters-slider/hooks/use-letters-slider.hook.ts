import * as React from 'react'
import { Alert, InteractionManager } from 'react-native'

interface UseLettersSlider {
  min: number;
  max: number;
  defaultMin: number;
  defaultMax: number;
  onValueChanged: (min: number, max: number) => void;
}

export const useLettersSlider = (
  onChange: (minMax: [ number, number ]) => void,
): UseLettersSlider => {
  const alertDebounceTimeRef = React.useRef(new Date().getTime())

  const DEFAULT_MIN = 2
  const DEFAULT_MAX = 14
  const BLOCK_MAX = 9

  const [ min, setMin ] = React.useState(DEFAULT_MIN)
  const [ max, setMax ] = React.useState(8)

  const onValueChanged = (_min: number, _max: number) => {
    if (_max <= BLOCK_MAX) {
      setMin(_min)
      setMax(_max)
      onChange([ _min, _max ])
    } else {
      // TODO: Go Premium

      setMin(_min)
      setMax(BLOCK_MAX)
      onChange([ _min, BLOCK_MAX ])

      if (new Date().getTime() - alertDebounceTimeRef.current > 3000) {
        setTimeout(() => {
          Alert.alert('Want longer results?', 'Buy PREMIUM Plan for only $9.99 / month', [
            {
              text: 'Cancel',
              onPress: () => null,
            },
            {
              text: 'Go Premium',
              onPress: () => null,
            }
          ])
        }, 1000)
      }

      alertDebounceTimeRef.current = new Date().getTime()
    }
  }

  return { min, max, defaultMin: DEFAULT_MIN, defaultMax: DEFAULT_MAX, onValueChanged }
}
