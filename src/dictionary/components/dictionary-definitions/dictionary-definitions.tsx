import * as React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { SpacingView } from '@core/styled'
import { Tx } from '@core/tx'

interface Props {
  isPending: boolean;
  wordFromDB: string | null;
  state: boolean | null;
  definitions: string[] | null;
}

export const DictionaryDefinitions = ({ isPending, wordFromDB, state, definitions }: Props) => (
  <ScrollView scrollEnabled={false}>
    {isPending ? (
      <SpacingView spacings="XXXL 0 0 0">
        <ActivityIndicator size="large" />
      </SpacingView>
    ) : (wordFromDB && !definitions?.length) || !state ? (
      <SpacingView spacings="L S 0">
        <Tx local="no_definitions_found" spacings="0 0 S 0" S bold center />
      </SpacingView>
    ) : (
      <SpacingView spacings="L S 0">
        {definitions?.map((definition: string, index: number) => (
          <Tx key={`${definition}${index}`} tx={`${index + 1}. ${definition}`} spacings="0 0 S 0" S bold center />
        ))}
      </SpacingView>
    )}
  </ScrollView>
)
