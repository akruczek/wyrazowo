import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Tx } from '@core/tx'
import { MarginView } from '@core/styled'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { useWordDefinitions } from '../../hooks/use-word-definitions.hook'

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
            <Tx key={definition} tx={`${index + 1}. ${definition}`} margins={[ 0, 0, 10, 0 ]} S bold center />
          ))}
        </>
      ) : (
        <Tx tx={localize().no_definitions_found} margins={[ 0, 0, 10, 0 ]} S bold center />
      )}
    </MarginView>
  )
}
