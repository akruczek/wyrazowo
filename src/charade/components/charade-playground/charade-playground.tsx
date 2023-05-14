import * as React from 'react'
import * as R from 'ramda'
import { Modalize } from 'react-native-modalize'
import { CustomKeyboard } from '@core/custom-keyboard/custom-keyboard'
import { CLEAR_BUTTON_ID, SEND_BUTTON_ID } from '@core/custom-keyboard/custom-keyboard.constants'
import { useForceUpdate } from '@core/hooks/use-force-update.hook'
import { CharadePlaygroundRow, CharadePlaygroundRowsList } from './charade-playground.styled'
import { CharadeField } from '../charade-field/charade-field'
import { createNewContents, updateRGYLetters } from '../../helpers'
import { EndModal } from '../end-modal/end-modal'

interface Props {
  word: string;
  allWords: string[];
}

export const CharadePlayground = ({ word, allWords }: Props) => {
  const count = word.length
  const modalizeRef = React.useRef<Modalize | null>(null)

  const [ success, setSuccess ] = React.useState<boolean>(false)
  const [ isError, setError ] = React.useState<boolean>(false)
  const [ activeRow, setActiveRow ] = React.useState(0)
  const [ activeIndex, setActiveIndex ] = React.useState(0)
  const forceUpdate = useForceUpdate()
  const [ contents, setContents ] = React.useState<(string | undefined)[]>([])

  const [ greenLetters, setGreenLetters ] = React.useState<string[]>([])
  const [ yellowLetters, setYellowLetters ] = React.useState<string[]>([])
  const [ redLetters, setRedLetters ] = React.useState<string[]>([])

  const rows = [ 0, 1, 2, 3, 4, 5 ]
  const fields = R.times(R.identity, count)

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

      if ([ ...new Set(newGreenLetters) ].length === word.length) {
        setSuccess(true)
        setTimeout(() => {
          modalizeRef?.current?.open()
        }, 1000)
      }

      if (activeRow === 5) {
        setTimeout(() => {
          modalizeRef?.current?.open()
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

  const renderItem = React.useCallback((rowIndex: number) => ({ item: index }: { item: any }) => (
    <CharadeField
      onPress={handlePress(index, rowIndex)}
      isActive={index === activeIndex && rowIndex === activeRow}
      isError={rowIndex === activeRow && isError}
      isSent={activeRow > rowIndex}
      word={word}
      index={index}
      count={count}
      content={contents[index + (rowIndex * (count + 1))] ?? ''}
    />
  ), [ contents, activeIndex, activeRow, isError ])

  const renderRow = React.useCallback(({ item: rowIndex }: { item: any }) => (
    <CharadePlaygroundRow data={fields} {...{ count, renderItem: renderItem(rowIndex) }} />
  ), [ contents, activeIndex, activeRow, isError ])

  return (
    <>
      <CharadePlaygroundRowsList renderItem={renderRow} data={rows} />
      <CustomKeyboard
        onPress={onPressLetter}
        {...{ greenLetters, yellowLetters, redLetters }}
      />

      <EndModal {...{ success, word, modalizeRef }} />
    </>
  )
}
