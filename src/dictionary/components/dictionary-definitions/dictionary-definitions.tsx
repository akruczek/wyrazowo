import * as React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import {
  DictionaryActivityIndicatorContainer, DictionaryDefinitionText, DictionaryDefinitionsContainer,
} from './dictionary-definitions.styled'

interface Props {
  isPending: boolean;
  wordFromDB: string | null;
  state: boolean | null;
  definitions: string[] | null;
}

export const DictionaryDefinitions = ({ isPending, wordFromDB, state, definitions }: Props) => (
  <ScrollView>
    {isPending ? (
      <DictionaryActivityIndicatorContainer>
        <ActivityIndicator size="large" />
      </DictionaryActivityIndicatorContainer>
    ) : (wordFromDB && !definitions?.length) || !state ? (
      <DictionaryDefinitionsContainer>
        <DictionaryDefinitionText children="No definitions found" />
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
