import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { CustomKeyboard } from '@core/custom-keyboard/custom-keyboard'
import { CharadePlaygroundRow, CharadePlaygroundRowsList } from './charade-playground.styled'
import { CharadeField } from '../charade-field/charade-field'
import { EndModal } from '../end-modal/end-modal'
import { useCharadePress } from '../../hooks'
import { getCharadeFieldContent } from '../../helpers'

interface Props {
  word: string;
  allWords: string[];
  setEnd: (success: boolean) => void;
}

export const CharadePlayground = ({ word, allWords, setEnd }: Props) => {
  const modalizeRef = React.useRef<Modalize | null>(null)

  const {
    handlePress, onPressLetter,
    activeRow, activeIndex, count, isError, success, contents, fields, rows,
    rgbLetters: [ redLetters, greenLetters, yellowLetters ],
  } = useCharadePress(word, allWords, setEnd, modalizeRef)

  const renderItem = React.useCallback((rowIndex: number) => ({ item: index }: { item: any }) => (
    <CharadeField
      onPress={handlePress(index, rowIndex)}
      isActive={index === activeIndex && rowIndex === activeRow}
      isError={rowIndex === activeRow && isError}
      isSent={activeRow > rowIndex}
      content={getCharadeFieldContent(contents, index, rowIndex, count)}
      {...{ word, index, count }}
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
