import * as React from 'react'
import { FlatList } from 'react-native'
import { Template } from '@core/template/template'
import { ThemeNumberFlag } from '@core/styled/theme'
import { ThemeItem } from './theme-item'

export const Theme = () => (
  <Template type="more" local="theme" backButton flex>
    <FlatList
      renderItem={props => <ThemeItem {...props} />}
      data={[ 0, 1, -1 ] as ThemeNumberFlag[]}
      scrollEnabled={false}
    />
  </Template>
)
