import * as React from 'react'
import { Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { InteractionManager } from 'react-native'
import { Host } from 'react-native-portalize'
import { asyncReadFile } from '../core/read-file/read-file'
import { LetterCard } from '../core/letter-card/letter-card'
import { LetterCardsContainer, SelectedLettersContainer } from './dashboard.styled'
import { useSelectLetter } from './hooks/use-select-letter.hook'
import { PossibleWordsModal } from './components/possible-words-modal/possible-words-modal'
import { findPossibleWords } from './helpers/find-possible-words.helper'

export const Dashboard = () => {
  const modalizeRef = React.useRef<any>(null)
  const { letters, selectedLetters, handleSelectLetter, handleDeselectLetter, isAnyLetterSelected } = useSelectLetter()
  const [ allWords, setAllWords ] = React.useState<string[]>([])
  const [ possibleWords, setPossibleWords ] = React.useState<string[]>([])

  const [ searchingTime, setSearchingTime ] = React.useState<number>(0)
  const searchingWordRef = React.useRef('')

  React.useEffect(() => {
    asyncReadFile('slowa').then(setAllWords)
  }, [])

  const onOpened = () => {
    setSearchingTime(new Date().getTime())

    const handleSetSearchingWord = (searchingWord: string) => {
      searchingWordRef.current = searchingWord
    }

    findPossibleWords(allWords, selectedLetters, handleSetSearchingWord).then((possibleWords: string[]) => {
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

  return (
    <Host>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SelectedLettersContainer>
            {selectedLetters.map((letter: string, index: number) => (
              <LetterCard
                key={`selected-letter-${letter}-${index}`}
                onPress={handleDeselectLetter(index)}
                content={letter}
              />
            ))}
          </SelectedLettersContainer>

          <LetterCardsContainer>
            {letters.map((letter: string, index: number) => (
              <LetterCard
                key={`letter-card-${letter}-${index}`}
                onPress={handleSelectLetter(letter, index)}
                isSelected={isAnyLetterSelected(index)}
                content={letter}
              />
            ))}
          </LetterCardsContainer>

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
  )
}
