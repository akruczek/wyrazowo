import * as React from 'react'
import { Alert, InteractionManager } from 'react-native'
import { goPremiumAlert } from '../../alerts/go-premium-alert'

interface UseLettersSlider {
  min: number;
  max: number;
  defaultMin: number;
  defaultMax: number;
  onValueChanged: (min: number, max: number) => void;
}

export const useLettersSlider = (
  onChange: (minMax: [ number, number ]) => void,
  [ defaultValue, defaultMin, defaultMax, blockMax ]: [ number, number, number, number ] | [],
): UseLettersSlider => {
  const alertDebounceTimeRef = React.useRef(new Date().getTime())

  const DEFAULT_MIN = defaultMin ?? 2
  const DEFAULT_MAX = defaultMax ?? 14
  const BLOCK_MAX = blockMax ?? 9

  const [ min, setMin ] = React.useState(DEFAULT_MIN)
  const [ max, setMax ] = React.useState(defaultValue ?? 8)

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
        setTimeout(goPremiumAlert, 1000)
      }

      alertDebounceTimeRef.current = new Date().getTime()
    }
  }

  return { min, max, defaultMin: DEFAULT_MIN, defaultMax: DEFAULT_MAX, onValueChanged }
}
