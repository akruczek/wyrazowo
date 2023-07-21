import * as React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { MarginView } from '@core/styled'
import { Tx } from '@core/tx'

interface Props {
  isPending: boolean;
  wordFromDB: string | null;
  state: boolean | null;
  definitions: string[] | null;
}

export const DictionaryDefinitions = ({ isPending, wordFromDB, state, definitions }: Props) => {
  const localize = useLocalize()

  return (
    <ScrollView scrollEnabled={false}>
      {isPending ? (
        <MarginView margins={[100, 0, 0, 0]}>
          <ActivityIndicator size="large" />
        </MarginView>
      ) : (wordFromDB && !definitions?.length) || !state ? (
        <MarginView margins={[ 20, 10, 0 ]}>
          <Tx tx={localize().no_definitions_found} margins={[ 0, 0, 10, 0 ]} S bold center />
        </MarginView>
      ) : (
        <MarginView margins={[ 20, 10, 0 ]}>
          {definitions?.map((definition: string, index: number) => (
            <Tx tx={`${index + 1}. ${definition}`} margins={[ 0, 0, 10, 0 ]} S bold center />
          ))}
        </MarginView>
      )}
    </ScrollView>
  )
}