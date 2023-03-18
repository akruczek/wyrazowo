import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useWordDefinitions } from '../../hooks/use-word-definitions.hook'
import { WordDetailsDefinitionsContainer, WordDetailsDefinitionText } from './word-details-modal.styled'

interface Props {
  word: string;
}

export const WordDetialsDefinitions = ({ word }: Props) => {
  const { definitions } = useWordDefinitions(word)

  return (
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
  )
}
