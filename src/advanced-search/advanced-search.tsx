import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Template } from '@core/template/template'
import { Tx } from '@core/tx'
import { SCREEN } from '../navigation/navigation.constants'
import { getNavigationParam } from '../navigation/navigation.helpers'
import { WordExtension } from './components/word-extension/word-extension'
import { SelectedLetters } from '../dashboard/components'

export const AdvancedSearch = () => {
  const navigation = useNavigation()
  const selectedLetters = getNavigationParam<string[]>('selectedLetters', navigation)

  return (
    <Template type="dashboard" local="advanced_search" leftIcon="magnify" leftScreen={SCREEN.DASHBOARD_SEARCH}>
      <Tx local="selected_letters" bolder disabled center />
      <SelectedLetters selectedLetters={selectedLetters} />

      <Tx local="word_extension" bolder disabled center spacings="L 0 0" />
      <WordExtension />
    </Template>
  )
}
