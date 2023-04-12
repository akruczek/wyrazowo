import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator, Button, FlatList } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { getWordPoints } from '../../../dashboard/helpers/get-word-points.helper'
import { WordDetailsModal } from '../word-details-modal/word-details-modal'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'
import { useWordDetail } from '../../hooks/use-word-detail.hook'
import { PossibleWordsModalFooter } from './possible-words-modal-footer'
import { useLocalize } from '../../../core/hooks/use-localize.hook'
import {
  NoResultsFoundIcon, PossibleWordsContainer, PossibleWordsLetterCardsContainer, SearchingDatabaseContainer,
  WordsGroupContainer, WordsGroupHeadline,
} from './possible-words-modal.styled'

interface Props {
  possibleWords: string[];
  noWordsFound: boolean;
  modalizeRef: React.MutableRefObject<any>;
  onOpened?: () => void;
  onClosed?: () => void;
  soapCharactersIndexes: (letter: string) => number[];
}

export const PossibleWordsModal = ({
  possibleWords, noWordsFound, modalizeRef, onOpened, onClosed, soapCharactersIndexes,
}: Props) => {
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()
  const wordDetailsModalRef = React.useRef<any>(null)

  const {
    onLongPressWord, getWordsByLettersCount, detailedWord, loadMore, isPending, maxReached,
  } = useWordDetail(possibleWords, wordDetailsModalRef)

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalTopOffset={topInset + BOTTOM_NAVIGATION_HEIGHT + 30}
        onOpened={onOpened}
        onClosed={onClosed}
        disableScrollIfPossible
        avoidKeyboardLikeIOS
        useNativeDriver
      >
        {!possibleWords?.length ? noWordsFound ? (
          <SearchingDatabaseContainer>
            <NoResultsFoundIcon />
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
              data={getWordsByLettersCount()}
              renderItem={({ item: wordsGroup }: { item: string[] }) => (
                <WordsGroupContainer key={wordsGroup.join('')}>
                  <WordsGroupHeadline children={`${wordsGroup[0].length} ${localize().by_letters}`} />

                  {R.sortWith([ R.descend(getWordPoints) ], wordsGroup).map((word: string) => (
                    <PossibleWordsLetterCardsContainer scrollEnabled={word?.length > 8} key={word}>
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
              ListFooterComponent={() => <PossibleWordsModalFooter onPress={loadMore} {...{ maxReached, isPending }} />}
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
