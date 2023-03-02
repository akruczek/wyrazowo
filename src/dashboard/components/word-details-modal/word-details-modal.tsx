import * as React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { getWordPoints } from '../../../dashboard/helpers/get-word-points.helper'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { LetterCardsContainer } from '../letters-grid/letters-grid.styled'
import {
  WordDetailsDefinitionsContainer, WordDetailsDefinitionText, WordDetailsHeadlineText, WordDetailsModalContainer
} from './word-details-modal.styled'

interface Props {
  word: string | null;
  modalizeRef: React.MutableRefObject<any>;
  topInset: number;
}

export const WordDetailsModal = ({ modalizeRef, word, topInset }: Props) => {
  const [ definitions, setDefinitions ] = React.useState<string[] | null>(null)

  const fetchWordFromSjp = () => {
    try {
      fetch(`https://sjp.pl/${word}`).then((response) => {
        response.text().then((text) => {
          const definitions = text
            ?.split('znaczenie')?.[1]
            ?.split('KOMENTARZE')?.[0]
            ?.split('max-width: 34em; ">')?.[1]
            ?.split('</p>')?.[0]
            ?.split('<br />')
            ?.map((definition: string) => definition?.split('. ')?.[1]?.trim?.())
            ?.filter((definition: string | null) => !!definition)
  
          setDefinitions(definitions)
        })
      })
    } catch {
      setDefinitions([])
    }
  }
  React.useEffect(() => {
    if (word) {
      fetchWordFromSjp()
    }
  }, [ word ])

  return (
    <Modalize
      ref={modalizeRef}
      modalTopOffset={topInset}
      avoidKeyboardLikeIOS
      useNativeDriver
    >
      {word ? (
        <WordDetailsModalContainer>
          <WordDetailsHeadlineText>
            {word} ({getWordPoints(word)})
          </WordDetailsHeadlineText>

          <LetterCardsContainer>
            {word.toUpperCase().split('').map((letter: string, index: number) => (
              <LetterCard
                key={`letter-card-${letter}-${index}`}
                content={letter}
                size={40}
                fontSize={TEXT_SIZE.M}
                withMargin
              />
            ))}
          </LetterCardsContainer>

          <WordDetailsDefinitionsContainer>
            {definitions === null ? (
              <ActivityIndicator size="large" />
            ) : definitions?.length ? (
              <>
                {definitions?.map((definition: string, index: number) => (
                  <WordDetailsDefinitionText key={definition}>
                    {index + 1}. {definition}
                  </WordDetailsDefinitionText>
                ))}
              </>
            ) : (
              <WordDetailsDefinitionText>
                No definitions found
              </WordDetailsDefinitionText>
            )}
          </WordDetailsDefinitionsContainer>
        </WordDetailsModalContainer>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </Modalize>
  )
}
