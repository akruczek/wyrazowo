import * as React from 'react'
import * as R from 'ramda'
import { CustomKeyboard } from '@core/custom-keyboard/custom-keyboard'
import { CharadePlaygroundRow, CharadePlaygroundRowsList } from './charade-playground.styled'
import { CharadeField } from '../charade-field/charade-field'
import { CLEAR_BUTTON_ID, SEND_BUTTON_ID } from '@core/custom-keyboard/custom-keyboard.constants'
import { useForceUpdate } from '@core/hooks/use-force-update.hook'

interface Props {
  count: number;
}

export const CharadePlayground = ({ count }: Props) => {
  const [ activeRow, setActiveRow ] = React.useState(0)
  const [ activeIndex, setActiveIndex ] = React.useState(0)
  const forceUpdate = useForceUpdate()
  const [ contents, setContents ] = React.useState<string[]>([])

  const rows = R.times(R.identity, count + 1)
  const fields = R.times(R.identity, count)

  const onPressLetter = React.useCallback((letter: string) => {
    if (letter === SEND_BUTTON_ID) {
      return
    } else if (letter === CLEAR_BUTTON_ID) {
      return
    } else {
      setContents((oldContents: string[]) => {
        let newContents = oldContents
        newContents[activeIndex + (activeRow * (count + 1))] = letter
        return newContents
      })

      if (activeIndex + 1 < count) {
        setActiveIndex(activeIndex + 1)
      }

      forceUpdate()
    }
  }, [ contents, activeIndex, activeRow ])

  const handlePress = (index: number, rowIndex: number) => () => {
    if (rowIndex === activeRow) {
      setActiveIndex(index)
    }
  }

  const renderItem = React.useCallback((rowIndex: number) => ({ item: index }: { item: any }) => (
    <CharadeField
      onPress={handlePress(index, rowIndex)}
      isActive={index === activeIndex && rowIndex === activeRow}
      count={count}
      content={contents[index + (rowIndex * (count + 1))]}
    />
  ), [ contents, activeIndex, activeRow ])

  const renderRow = React.useCallback(({ item: rowIndex }: { item: any }) => (
    <CharadePlaygroundRow data={fields} {...{ count, renderItem: renderItem(rowIndex) }} />
  ), [ contents, activeIndex, activeRow ])

  return (
    <>
      <CharadePlaygroundRowsList renderItem={renderRow} data={rows} />
      <CustomKeyboard onPress={onPressLetter} />
    </>
  )
}
