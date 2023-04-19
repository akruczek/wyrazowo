import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useWordDefinitions } from '../../hooks/use-word-definitions.hook'
import { WordDetailsDefinitionText } from './word-details-modal.styled'
import { MarginView } from '../../../core/styled/margin-view.styled';

interface Props {
  word: string;
}

export const WordDetialsDefinitions = ({ word }: Props) => {
  const { definitions } = useWordDefinitions(word)

  return (
    <MarginView margins={[ 10, 0, 0, 0 ]}>
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
    </MarginView>
  )
}
