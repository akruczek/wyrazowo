import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator, FlatList } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { getWordPoints } from '../../../dashboard/helpers/get-word-points.helper'
import { WordDetailsModal } from '../word-details-modal/word-details-modal'
import { CustomButton } from '../../../core/custom-button/custom-button'
import {
  PossibleWordsContainer, PossibleWordsLetterCardsContainer, SearchingDatabaseContainer,
  SearchMoreButtonContainer,
  WordsGroupContainer, WordsGroupHeadline,
} from './possible-words-modal.styled'

interface Props {
  possibleWords: string[];
  noWordsFound: boolean;
  modalizeRef: React.MutableRefObject<any>;
  onOpened: () => void;
  onClosed: () => void;
  onLoadMore: () => void;
  soapCharactersIndexes: (letter: string) => number[];
}

export const PossibleWordsModal = ({
  possibleWords, noWordsFound, modalizeRef, onOpened, onClosed, onLoadMore, soapCharactersIndexes,
}: Props) => {
  const wordDetailsModalRef = React.useRef<any>(null)
  const [ detailedWord, setDetailedWord ] = React.useState<null | string>(null)

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

  const onLongPressWord = (word: string) => () => {
    setDetailedWord(word)
    wordDetailsModalRef?.current?.open?.()
  }

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalTopOffset={topInset}
        onOpened={onOpened}
        onClosed={onClosed}
        disableScrollIfPossible
        avoidKeyboardLikeIOS
        useNativeDriver
      >
        {!possibleWords?.length ? noWordsFound ? (
          <SearchingDatabaseContainer>
            <WordsGroupHeadline>
              No words found
            </WordsGroupHeadline>
          </SearchingDatabaseContainer>
        ) : (
          <SearchingDatabaseContainer>
            <ActivityIndicator size="large" />
          </SearchingDatabaseContainer>
        ) : (
          <PossibleWordsContainer>
            <FlatList
              maxToRenderPerBatch={10}
              scrollEnabled={false}
              renderItem={({ item: wordsGroup }: { item: string[] }) => (
                <WordsGroupContainer key={wordsGroup.join('')}>
                  <WordsGroupHeadline>
                    {wordsGroup[0].length} LETTERS
                  </WordsGroupHeadline>

                  {R.sortWith([ R.descend(getWordPoints) ], wordsGroup).map((word: string) => (
                    <PossibleWordsLetterCardsContainer key={word}>
                      {word.toUpperCase().split('').map((letter: string, index: number) => (
                        <LetterCard
                          key={`letter-card-${letter}-${index}`}
                          content={letter}
                          onLongPress={onLongPressWord(word)}
                          size={40}
                          fontSize={TEXT_SIZE.M}
                          isSelected={soapCharactersIndexes(word).includes(index)}
                          withMargin
                        />
                      ))}
                    </PossibleWordsLetterCardsContainer>
                  ))}
                </WordsGroupContainer>
              )}
              data={getWordsByLettersCount()}
              ListFooterComponent={(
                <SearchMoreButtonContainer>
                  <CustomButton titleSize={TEXT_SIZE.XS} title="LOAD MORE...." onPress={onLoadMore} />
                </SearchMoreButtonContainer>
              )}
            />
          </PossibleWordsContainer>
        )}
      </Modalize>

      <WordDetailsModal
        word={detailedWord}
        topInset={topInset}
        modalizeRef={wordDetailsModalRef}
      />
    </Portal>
  )
}
