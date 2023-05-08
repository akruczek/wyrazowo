import * as React from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { Zoom } from 'react-native-reanimated-zoom';
import { useSelector } from 'react-redux'
import { selectedLettersSelector } from '../dashboard/store/dashboard.selectors'
import { GestureLettersGrid } from './components/gesture-letters-grid/gesture-letters-grid'
import { PlaygroundField } from './components/playground-field/playground-field'
import { PLAYGROUND_SPACING_MULTIPLIER } from './components/playground-field/playground-field.styled'
import { PLAYGROUND_FIELDS } from './playground.constants'
import { PlaygroundFieldModel } from './playground.models'
import { AdvancedSearchModal } from './components/advanced-search-modal/advanced-search-modal';
import { PlaygroundBacklight } from './components/playground-backlight/playground-backlight';
import {
  PlaygroundBottomContainer, PlaygroundFlatList, PlaygroundSafeArea, PlaygroundStatusBar,
} from './playground.styled'

export const Playground = () => {
  const advancedSearchModalizeRef = React.useRef<any>(null)
  const [ advancedSearchIndexes, setAdvancedSearchIndexes ] = React.useState<[ number, number ] | null>(null)
  const ref = React.useRef<View>(null)
  const fieldRefs: (View | null)[] = []

  const [ extraData, setExtraData ] = React.useState<number>(0)
  const [ selectedLetters, setSelectedLetters ] = React.useState<(string | null)[]>([])

  const userSelectedLetters = useSelector(selectedLettersSelector)

  const handleRemoveSelectedLetter = (index: number) => {
    const newSelectedLetters = selectedLetters
    newSelectedLetters[index] = null
    setSelectedLetters(newSelectedLetters)
    setExtraData(d => d + 1)
  }

  const handleClearPlayground = () => {
    setSelectedLetters([])
    setExtraData(d => d + 1)
    setAdvancedSearchIndexes(null)
  }

  const onPressColumn = () => {
    // advancedSearchIndexes?.[0]
  }

  const onPressRow = () => {
    // advancedSearchIndexes?.[1]
  }

  const onLongPressField = (index: number) => {
    if (advancedSearchIndexes) {
      setAdvancedSearchIndexes(null)
    } else {
      const rowIndex = Math.floor(index / 15)
      const columnIndex = Math.floor(index % 15)
      setAdvancedSearchIndexes([ columnIndex, rowIndex ])
    }
  }

  const renderItem = React.useCallback(({ item, index }: { item: PlaygroundFieldModel, index: number }) => (
    <PlaygroundField
      {...item}
      onPress={handleRemoveSelectedLetter}
      onLongPress={onLongPressField}
      {...{ index, fieldRefs, selectedLetters }}
    />
  ), [ extraData ])

  const onDragRelease = (letter: string) => (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent

    ref?.current?.measure?.((_: number, __: number, width: number, height: number, px: number, py: number) => {
      if (pageX >= px && pageX <= px + width && pageY >= py && pageY <= py + height) {

        fieldRefs.forEach((fieldRef, index: number) => {
          fieldRef?.measure?.((_: number, __: number, fwidth: number, fheight: number, fpx: number, fpy: number) => {
            if (pageX >= fpx && pageX <= fpx + fwidth && pageY >= fpy && pageY <= fpy + fheight) {
              const newSelectedLetters = selectedLetters
              newSelectedLetters[index] = letter

              setSelectedLetters(newSelectedLetters)
              setExtraData(d => d + 1)
            }
          })
        })
      }
    })
  }

  return (
    <PlaygroundSafeArea>
      <PlaygroundStatusBar />
      <Zoom maximumZoomScale={PLAYGROUND_SPACING_MULTIPLIER}>
        <View ref={ref}>
          <PlaygroundBacklight {...{ onPressColumn, onPressRow, advancedSearchIndexes }} />

          <PlaygroundFlatList
            renderItem={renderItem}
            extraData={extraData}
            numColumns={15}
            data={PLAYGROUND_FIELDS}
            scrollEnabled={false}
          />
        </View>
      </Zoom>

      <PlaygroundBottomContainer>
        <GestureLettersGrid {...{ onDragRelease, userSelectedLetters, selectedLetters, handleClearPlayground }} />
      </PlaygroundBottomContainer>

      <AdvancedSearchModal modalizeRef={advancedSearchModalizeRef} />
    </PlaygroundSafeArea>
  )
}
