import * as React from 'react'
import { useDispatch } from 'react-redux'
import { DevSettings } from 'react-native'
import { LANGUAGE_EMOJIS, LANGUAGE_LABELS } from '@core/localize/localize.constants'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { restartAppAlert } from '@core/alerts/restart-app-alert'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { OptionItem } from '../option-item/option-item'
import { setLanguageCodeAction } from '../../../settings/store/settings.slice'

interface Props {
  item: LANGUAGE_CODES;
  index: number;
}

export const LanguageItem = ({ item, index }: Props) => {
  const localize = useLocalize()
  const dispatch = useDispatch()
 
  const onChange = () => {
    restartAppAlert(localize, () => {
      dispatch(setLanguageCodeAction(item))
      setTimeout(() => {
        DevSettings.reload()
      })
    })
  }

  return (
    <OptionItem tx={LANGUAGE_LABELS[index]} emoji={LANGUAGE_EMOJIS[index]} onChange={onChange} />
  )
}
