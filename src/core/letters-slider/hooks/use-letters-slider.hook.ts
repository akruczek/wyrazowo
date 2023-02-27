import * as React from 'react'

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
  const DEFAULT_MIN = 1
  const DEFAULT_MAX = 10

  const [ min, setMin ] = React.useState(DEFAULT_MIN)
  const [ max, setMax ] = React.useState(DEFAULT_MAX)

  const onValueChanged = (_min: number, _max: number) => {
    setMin(_min)
    setMax(_max)
    onChange([ _min, _max ])
  }

  return { min, max, defaultMin: DEFAULT_MIN, defaultMax: DEFAULT_MAX, onValueChanged }
}
