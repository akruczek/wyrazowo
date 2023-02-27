import * as React from 'react'
import * as R from 'ramda'
import { Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Host } from 'react-native-portalize'
import { asyncReadFile } from '../core/read-file/read-file'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { findPossibleWords } from './helpers/find-possible-words.helper'
import { LettersSlider } from '../core/letters-slider/letters-slider'
import { SelectedLetters } from './components/selected-letters/selected-letters'
import { LettersGrid } from './components/letters-grid/letters-grid'

export const Dashboard = () => {
  const modalizeRef = React.useRef<any>(null)
  const { letters, selectedLetters, handleSelectLetter, handleDeselectLetter, isAnyLetterSelected } = useSelectLetter()
  const [ allWords, setAllWords ] = React.useState<string[]>([])
  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])

  const [ searchingTime, setSearchingTime ] = React.useState<number>(0)
  const searchingWordRef = React.useRef('')

  const wordLengthRef = React.useRef<[ number, number ]>([ 1, 10 ])

  React.useEffect(() => {
    asyncReadFile('slowa').then(setAllWords)
  }, [])

  const onOpened = () => {
    setSearchingTime(new Date().getTime())

    const handleSetSearchingWord = (searchingWord: string) => {
      searchingWordRef.current = searchingWord
    }

    findPossibleWords(allWords, selectedLetters, wordLengthRef.current, handleSetSearchingWord).then((possibleWords: string[]) => {
      setPossibleWords(possibleWords)
      setSearchingTime(new Date().getTime() - searchingTime)
    })
  }

  const onClosed = () => {
    setPossibleWords([])
  }

  const onPress = () => {
    modalizeRef?.current?.open?.()
  }

  const onLengthChange = (minMax: [ number, number ]) => {
    if (minMax.join('') !== wordLengthRef.current.join('')) {
      wordLengthRef.current = minMax
    }
  }

  return React.useMemo(() => (
    <Host>
      <SafeAreaView>
        <ScrollView scrollEnabled={false} contentInsetAdjustmentBehavior="automatic">
          <SelectedLetters {...{ selectedLetters, handleDeselectLetter }} />
          <LettersGrid {...{ letters, handleSelectLetter, isAnyLetterSelected }} />
          <LettersSlider onChange={onLengthChange} />
          <Button title="CHECK!" onPress={onPress} />
        </ScrollView>

        <PossibleWordsModal
          searchingWordRef={searchingWordRef}
          possibleWords={possibleWords}
          modalizeRef={modalizeRef}
          {...{ onOpened, onClosed }}
        />
      </SafeAreaView>
    </Host>
  ), [ selectedLetters, letters, possibleWords ])
}
