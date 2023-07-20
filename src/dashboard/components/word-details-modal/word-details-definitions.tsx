import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { MarginView } from '@core/styled'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { useWordDefinitions } from '../../hooks/use-word-definitions.hook'
import { WordDetailsDefinitionText } from './word-details-modal.styled'

interface Props {
  word: string;
}

export const WordDetialsDefinitions = ({ word }: Props) => {
  const localize = useLocalize()
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
        <WordDetailsDefinitionText children={localize().no_definitions_found} />
      )}
    </MarginView>
  )
}
