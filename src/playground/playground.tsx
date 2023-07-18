import * as React from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import { selectedLettersSelector } from '../dashboard/store/dashboard.selectors'
import { SCREEN } from '../navigation/navigation.constants'
import { GestureLettersGrid } from './components/gesture-letters-grid/gesture-letters-grid'
import { PlaygroundField } from './components/playground-field/playground-field'
import { PLAYGROUND_FIELDS } from './playground.constants'
import { PlaygroundFieldModel } from './playground.models'
import { AdvancedSearchModal } from './components/advanced-search-modal/advanced-search-modal'
import { PlaygroundBacklight } from './components/playground-backlight/playground-backlight'
import { PlaygroundBottomContainer, PlaygroundFlatList, PlaygroundZoom } from './playground.styled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Playground = () => {
  const navigation = useNavigation<any>()
  const localize = useLocalize()
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

  const handleSwitchToSearch = () => {
    navigation.navigate(SCREEN.DASHBOARD_SEARCH)
  }

  const leftContentConfig = {
    onPress: handleSwitchToSearch,
    icon: 'magnify',
  }

  const { bottom: bottomInset } = useSafeAreaInsets()

  return (
    <Template type="dashboard" title={localize().playground.toUpperCase()} leftContentConfig={leftContentConfig}>
      <PlaygroundZoom>
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
      </PlaygroundZoom>

      <PlaygroundBottomContainer {...{ bottomInset }}>
        <GestureLettersGrid {...{ onDragRelease, userSelectedLetters, selectedLetters, handleClearPlayground }} />
      </PlaygroundBottomContainer>

      <AdvancedSearchModal modalizeRef={advancedSearchModalizeRef} />
    </Template>
  )
}
