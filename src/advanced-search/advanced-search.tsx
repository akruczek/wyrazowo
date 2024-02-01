import * as React from 'react'
import { Template } from '@core/template/template'
import { SCREEN } from '../navigation/navigation.constants'
import { WordExtension } from './components/word-extension/word-extension'

export const AdvancedSearch = () => {
  return (
    <Template type="dashboard" local="advanced_search" leftIcon="magnify" leftScreen={SCREEN.DASHBOARD_SEARCH}>
      <WordExtension />
    </Template>
  )
}
