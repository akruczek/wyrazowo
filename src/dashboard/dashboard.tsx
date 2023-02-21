import * as React from 'react'
import * as R from 'ramda'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LetterCard } from '../core/letter-card/letter-card'
import { ALL_LETTERS_SORTED, LETTER_ANY, LETTER_SOAP } from '../core/letter-card/letter-card.constants'
import { LetterCardsContainer, SelectedLetterCardWrapper, SelectedLettersContainer } from './dashboard.styled'

export const Dashboard = () => {
  const MAX_SELECTED_LETTERS = 7

  const [ selectedLetters, updateSelectedLetters ] = React.useState<string[]>([])
  const [ selectedAnyLettersIndexes, updateSelectedAnyLettersIndexes ] = React.useState<number[]>([])

  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_ANY, LETTER_ANY ]

  const handleSelectLetter = (letter: string, index: number) => () => {
    if (letter === LETTER_ANY) {
      if (R.includes(index, selectedAnyLettersIndexes)) {
        updateSelectedAnyLettersIndexes(list => R.without([ index ], list))
      } else {
        updateSelectedAnyLettersIndexes(list => R.append(index, list))
      }
    } else {
      if (selectedLetters?.length < MAX_SELECTED_LETTERS) {
        updateSelectedLetters(R.append(letter, selectedLetters))
      }
    }
  }

  const handleDeselectLetter = (index: number) => () => {
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SelectedLettersContainer>
          {selectedLetters.map((letter: string, index: number) => (
            <SelectedLetterCardWrapper>
              <LetterCard
                key={`selected-letter-${letter}-${index}`}
                onPress={handleDeselectLetter(index)}
                content={letter}
              />
            </SelectedLetterCardWrapper>
          ))}
        </SelectedLettersContainer>

        <LetterCardsContainer>
          {letters.map((letter: string, index: number) => (
            <LetterCard
              key={`letter-card-${letter}-${index}`}
              onPress={handleSelectLetter(letter, index)}
              isSelected={selectedAnyLettersIndexes?.includes(index)}
              content={letter}
            />
          ))}
        </LetterCardsContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
