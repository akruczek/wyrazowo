import * as React from 'react'
import { Template } from '@core/template/template'
import { SCREEN } from '../navigation/navigation.constants'

export const WordExtension = () => {
  return (
    <Template type="dashboard" local="advanced_search" leftIcon="magnify" leftScreen={SCREEN.DASHBOARD_SEARCH}>

    </Template>
  )
}
