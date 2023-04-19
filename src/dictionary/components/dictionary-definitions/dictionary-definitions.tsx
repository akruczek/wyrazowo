import * as React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { MarginView } from '@core/styled/margin-view.styled';
import { DictionaryDefinitionText, DictionaryDefinitionsContainer } from './dictionary-definitions.styled'

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
        <DictionaryDefinitionsContainer>
          <DictionaryDefinitionText children={localize().no_definitions_found} />
        </DictionaryDefinitionsContainer>
      ) : (
        <DictionaryDefinitionsContainer>
          {definitions?.map((definition: string, index: number) => (
            <DictionaryDefinitionText key={definition}>
              {index + 1}. {definition}
            </DictionaryDefinitionText>
          ))}
        </DictionaryDefinitionsContainer>
      )}
    </ScrollView>
  )
}