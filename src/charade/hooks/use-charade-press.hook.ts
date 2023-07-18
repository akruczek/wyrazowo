import * as React from 'react'
import * as R from 'ramda'
import { Modalize } from 'react-native-modalize'
import { useForceUpdate } from '@core/hooks/use-force-update.hook'
import { CLEAR_BUTTON_ID, SEND_BUTTON_ID } from '@core/custom-keyboard/custom-keyboard.constants'
import { createNewContents, updateRGYLetters } from '../helpers'

interface UseCharadePress {
  handlePress: (index: number, rowIndex: number) => () => void,
  onPressLetter: (letter: string) => void,
  activeRow: number,
  activeIndex: number,
  count: number,
  isError: boolean,
  success: boolean,
  contents: (string | undefined)[],
  fields: number[],
  rows: number[],
  rgbLetters: [ string[], string[], string[] ],
}

export const useCharadePress = (
  word: string,
  allWords: string[],
  setEnd: (success: boolean) => void,
  modalizeRef: React.MutableRefObject<Modalize | null>,
): UseCharadePress => {
  const count = word.length

  const rows = [ 0, 1, 2, 3, 4, 5 ]
  const fields = R.times(R.identity, count)

  const [ success, setSuccess ] = React.useState<boolean>(false)
  const [ isError, setError ] = React.useState<boolean>(false)
  const [ activeRow, setActiveRow ] = React.useState(0)
  const [ activeIndex, setActiveIndex ] = React.useState(0)
  const forceUpdate = useForceUpdate()
  const [ contents, setContents ] = React.useState<(string | undefined)[]>([])

  const [ greenLetters, setGreenLetters ] = React.useState<string[]>([])
  const [ yellowLetters, setYellowLetters ] = React.useState<string[]>([])
  const [ redLetters, setRedLetters ] = React.useState<string[]>([])

  const onPressLetter = React.useCallback((letter: string) => {
    const activeWord = contents.slice((activeRow * (count + 1)), (activeRow * (count + 1)) + count).join('')

    if (letter === SEND_BUTTON_ID) {
      if (!allWords.includes(activeWord.toLowerCase())) {
        setError(true)
        return
      }

      const [ newRedLetters, newGreenLetters, newYellowLetters ] = updateRGYLetters(
        contents, activeRow, count, word, [ redLetters, greenLetters, yellowLetters ],
      )

      setGreenLetters(newGreenLetters)
      setYellowLetters(newYellowLetters)
      setRedLetters(newRedLetters)
      setActiveRow(R.inc)
      setActiveIndex(0)

      if (activeWord === word) {
        setSuccess(true)
        setTimeout(() => {
          modalizeRef?.current?.open()
          setEnd(true)
        }, 1000)
      }

      if (activeRow === 5) {
        setTimeout(() => {
          modalizeRef?.current?.open()
          setEnd(true)
        }, 1000)
      }
    } else if (letter === CLEAR_BUTTON_ID) {
      setContents(createNewContents(activeIndex, activeRow, count, undefined))
      if (activeIndex > 0) setActiveIndex(activeIndex - 1)
      forceUpdate()
    } else {
      setContents(createNewContents(activeIndex, activeRow, count, letter))
      if (activeIndex + 1 < count) setActiveIndex(activeIndex + 1)
      forceUpdate()
    }

    setError(false)
  }, [ contents, activeIndex, activeRow, isError, greenLetters ])

  const handlePress = (index: number, rowIndex: number) => () => {
    if (rowIndex === activeRow) {
      setActiveIndex(index)
    }
  }

  return {
    handlePress, onPressLetter,
    activeRow, activeIndex, count, isError, success, contents, fields, rows,
    rgbLetters: [ redLetters, greenLetters, yellowLetters ],
  }
}
