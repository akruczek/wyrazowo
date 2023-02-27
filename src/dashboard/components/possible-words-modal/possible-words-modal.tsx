import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator, FlatList } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { LetterCardsContainer } from '../letters-grid/letters-grid.styled'
import {
  PossibleWordsContainer, SearchingDatabaseContainer, WordsGroupContainer, WordsGroupHeadline, WordsGroupText,
} from './possible-words-modal.styled'

interface Props {
  possibleWords: string[];
  modalizeRef: React.MutableRefObject<any>;
  searchingWordRef: React.MutableRefObject<string>;
  onOpened: () => void;
  onClosed: () => void;
}

export const PossibleWordsModal = ({ possibleWords, modalizeRef, onOpened, onClosed, searchingWordRef }: Props) => {
  const { top: topInset } = useSafeAreaInsets()

  const getWordsByLettersCount = () => {
    let wordsToDisplay: string[][] = []

    const words = R.sortWith(
      [ R.descend(R.prop('length')) ],
      possibleWords
    )

    words.forEach((word: string) => {
      wordsToDisplay[word.length] = R.append(word, wordsToDisplay[word.length] ?? [])
    })

    return R.pipe<string[][][], string[][], string[][]>(
      R.reverse,
      R.filter(R.complement(R.isNil)),
    )(wordsToDisplay)
  }

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalTopOffset={topInset}
        onOpened={onOpened}
        onClosed={onClosed}
        disableScrollIfPossible
        useNativeDriver
      >
        {!possibleWords?.length ? (
          <SearchingDatabaseContainer>
            <ActivityIndicator size="large" />
          </SearchingDatabaseContainer>
        ) : (
          <PossibleWordsContainer>
            <FlatList
              renderItem={({ item: wordsGroup }: { item: string[] }) => (
                <WordsGroupContainer key={wordsGroup.join('')}>
                  <WordsGroupHeadline>
                    {wordsGroup[0].length} LETTERS
                  </WordsGroupHeadline>

                  {wordsGroup.map((word: string) => (
                    <LetterCardsContainer key={word}>
                      {word.toUpperCase().split('').map((letter: string, index: number) => (
                        <LetterCard
                          key={`letter-card-${letter}-${index}`}
                          content={letter}
                          size={40}
                          fontSize={TEXT_SIZE.M}
                        />
                      ))}
                    </LetterCardsContainer>
                  ))}
                </WordsGroupContainer>
              )}
              data={getWordsByLettersCount()}
            />
          </PossibleWordsContainer>
        )}
      </Modalize>
    </Portal>
  )
}
