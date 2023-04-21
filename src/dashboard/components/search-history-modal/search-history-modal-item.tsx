import * as React from 'react'
import { View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { LetterCard } from '@core/letter-card/letter-card'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '@core/letter-card/letter-card.constants'
import { LetterSliderLengthIcon } from '@core/letters-slider/letter-slider.styled'
import { SearchResultModel } from '@core/storage/storage.models'
import { TEXT_SIZE } from '@core/text/text.constants'
import { PossibleWordsModal } from '../possible-words-modal/possible-words-modal'
import { SearchHistoryModalItemContainer, SearchHistoryModalItemText } from './search-history-modal.styled'

interface Props {
  item: SearchResultModel;
  soapCharactersIndexes: (word: string, _selectedLetters?: string[]) => number[];
}

export const SearchHistoryModalItem = ({
  item, soapCharactersIndexes,
}: Props) => {
  const modalizeRef = React.useRef<Modalize>(null)
  const selectedLetters = [ ...item.selectedLetters ].sort()

  const handleSearchFromHistory = () => {
    modalizeRef?.current?.open?.()
  }

  const wordLengthToDisplay = `${item.wordLength[0]} - ${item.wordLength[1]}`
  const getDateToDisplay = () => {
    const DD = new Date(item.timestamp).getDate()
    const _MM = new Date(item.timestamp).getMonth() + 1
    const MM = _MM >= 10 ? _MM : `0${_MM}`
    const YYYY = new Date(item.timestamp).getFullYear()

    return `${DD}-${MM}-${YYYY}`
  }

  const _soapCharactersIndexes = (letter: string) => soapCharactersIndexes(letter, selectedLetters)

  const getContent = (letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER)
    ? LETTER_SOAP
    : letter.includes(LETTER_INDEX_SEPARATOR)
      ? letter.split(LETTER_INDEX_SEPARATOR)?.[0]
      : letter

  return (
    <View>
      <SearchHistoryModalItemContainer>
        <LetterSliderLengthIcon />
        <SearchHistoryModalItemText>
          {wordLengthToDisplay}, ({getDateToDisplay()})
        </SearchHistoryModalItemText>
      </SearchHistoryModalItemContainer>

      <SearchHistoryModalItemContainer onPress={handleSearchFromHistory} withBorder>
        {selectedLetters.map((letter: string, index: number) => (
          <LetterCard
            key={`history-letter-card-${letter}-${index}`}
            content={getContent(letter)}
            onPress={handleSearchFromHistory}
            size={30}
            fontSize={TEXT_SIZE.S}
            indexFontSize={TEXT_SIZE.XXXS}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            forcedIndex={letter.split(LETTER_INDEX_SEPARATOR)?.[1]}
            withMargin
          />
        ))}
      </SearchHistoryModalItemContainer>

      <PossibleWordsModal
        possibleWords={item.result}
        modalizeRef={modalizeRef}
        soapCharactersIndexes={_soapCharactersIndexes}
        noWordsFound={!item.result.length}
      />
    </View>
  )
}
