import * as React from 'react'
import { FlatList } from 'react-native'
import { Template } from '@core/template/template'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { LanguageItem } from './language-item'

export const Language = () => (
  <Template type="more" local="language" backButton flex>
    <FlatList
      renderItem={props => <LanguageItem {...props} />}
      data={Object.values(LANGUAGE_CODES)}
      scrollEnabled={false}
    />
  </Template>
)
