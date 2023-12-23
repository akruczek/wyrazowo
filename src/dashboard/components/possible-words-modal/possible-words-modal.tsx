import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator, FlatList } from 'react-native'
import { Portal } from 'react-native-portalize'
import { LetterCard } from '@core/letter-card/letter-card'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SpacingView } from '@core/styled'
import { useModalTopOffset } from '@core/hooks/use-modal-top-offset.hook'
import { CustomModalize } from '@core/custom-modalize/cutom-modalize'
import { Tx } from '@core/tx'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { useGesturesEnabled, useWordDetail } from '../../hooks'
import { getWordPoints } from '../../../dashboard/helpers'
import { WordDetailsModal } from '../word-details-modal/word-details-modal'
import { PossibleWordsModalFooter } from './possible-words-modal-footer'
import {
  NoResultsFoundIcon, PossibleWordsContainer, PossibleWordsLetterCardsContainer, SearchingDatabaseContainer,
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
  const RTL = useRTL()
  const modalOffset = useModalTopOffset()
  const wordDetailsModalRef = React.useRef<any>(null)

  const {
    onLongPressWord, getWordsByLettersCount, detailedWord, loadMore, isPending, maxReached,
  } = useWordDetail(possibleWords, wordDetailsModalRef)

  const { onScroll, panGestureEnabled, resetFlag, setResetFlag } = useGesturesEnabled()

  const _onClosed = () => {
    onClosed?.()

    setResetFlag(false)
    setTimeout(() => setResetFlag(true))
  }

  return resetFlag ? (
    <Portal>
      <CustomModalize
        reference={modalizeRef}
        modalTopOffset={modalOffset}
        onOpened={onOpened}
        onClosed={_onClosed}
        disableScrollIfPossible
        panGestureEnabled={panGestureEnabled}
        scrollViewProps={{ onScroll, showsVerticalScrollIndicator: false }}
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
                <SpacingView key={wordsGroup.join('')} RTL={RTL} spacings="0 0 S XXS">
                  <Tx right={RTL} prefix={`${wordsGroup[0].length} `} local="by_letters" spacings="0 0 XXS" />

                  {R.sortWith([ R.descend(getWordPoints) ], wordsGroup).map((word: string) => (
                    <PossibleWordsLetterCardsContainer RTL={RTL} scrollEnabled={word?.length > 8} key={word}>
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
                </SpacingView>
              )}
              ListFooterComponent={() => <PossibleWordsModalFooter onPress={loadMore} {...{ maxReached, isPending }} />}
            />
          </PossibleWordsContainer>
        )}
      </CustomModalize>

      <WordDetailsModal word={detailedWord} modalizeRef={wordDetailsModalRef} />
    </Portal>
  ) : null
}
