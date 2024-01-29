import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { goPremiumAlert } from '../../alerts/go-premium-alert'
import { SCREEN } from '../../../navigation/navigation.constants'
import { LetterSliderDefaultValues } from '../models'

interface UseLettersSlider {
  min: number;
  max: number;
  isWarning: boolean;
  defaultMin: number;
  defaultMax: number;
  isInitialValue: boolean;
  onValueChanged: (min: number, max: number) => void;
  restoreSlider: () => void;
}

export const useLettersSlider = (
  onChange: (minMax: [ number, number ]) => void,
  [ defaultValueMin, defaultValueMax, defaultMin, defaultMax, blockMax ]: LetterSliderDefaultValues | [],
  lengthFilter: number | null,
): UseLettersSlider => {
  const navigation = useNavigation<any>()
  const alertDebounceTimeRef = React.useRef(new Date().getTime())

  const INITIAL_VALUE: [ number, number ] = [ 2, 8 ]
  const DEFAULT_MIN = defaultMin ?? 2
  const DEFAULT_MAX = defaultMax ?? 15
  const BLOCK_MAX = blockMax ?? 9
  const WARNING_STEP = 10

  const [ min, setMin ] = React.useState(defaultValueMin ?? DEFAULT_MIN)
  const [ max, setMax ] = React.useState(defaultValueMax ?? 8)
  const isWarning = React.useMemo(() => max > WARNING_STEP, [ max ])

  const onValueChanged = (_min: number, _max: number) => {
    if (_max <= BLOCK_MAX) {
      setMin(_min)
      setMax(_max)
      onChange([ _min, _max ])
    } else {
      setMin(_min)
      setMax(BLOCK_MAX)
      onChange([ _min, BLOCK_MAX ])

      if (new Date().getTime() - alertDebounceTimeRef.current > 3000) {
        setTimeout(() => {
          goPremiumAlert(() => {
            navigation.navigate(SCREEN.MORE)
          })
        }, 1000)
      }

      alertDebounceTimeRef.current = new Date().getTime()
    }
  }

  const restoreSlider = () => {
    onValueChanged(...INITIAL_VALUE)
  }

  React.useEffect(() => {
    if (lengthFilter) {
      onValueChanged(lengthFilter, lengthFilter)
    }
  }, [ lengthFilter ])

  return {
    min, max, isWarning,
    defaultMin: DEFAULT_MIN,
    defaultMax: DEFAULT_MAX,
    isInitialValue: min === INITIAL_VALUE[0] && max === INITIAL_VALUE[1],
    onValueChanged, restoreSlider,
  }
}
