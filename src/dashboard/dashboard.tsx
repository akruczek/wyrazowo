import * as React from 'react'
import { Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { asyncReadFile } from '../core/read-file/read-file'
import { LetterCard } from '../core/letter-card/letter-card'
import { LetterCardsContainer, SelectedLettersContainer } from './dashboard.styled'
import { useSelectLetter } from './hooks/use-select-letter.hook'

export const Dashboard = () => {
  const { letters, selectedLetters, handleSelectLetter, handleDeselectLetter, isAnyLetterSelected } = useSelectLetter()
  const d = React.useRef('')

  React.useEffect(() => {
    asyncReadFile('slowa').then((response: string[]) => {
      console.log(response.length)
    })
  }, [])

  const onPress = () => {

  }

  return (
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
    </SafeAreaView>
  )
}
