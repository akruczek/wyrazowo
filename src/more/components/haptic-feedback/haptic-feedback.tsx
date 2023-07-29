import * as React from 'react'
import { FlatList } from 'react-native'
import { Template } from '@core/template/template'
import { HapticFeedbackItem } from './haptic-feedback-item'

export const HapticFeedback = () => (
  <Template type="more" local="haptic_feedback" backButton flex>
    <FlatList
      renderItem={props => <HapticFeedbackItem {...props} />}
      data={[ 'on', 'off' ] as ('on' | 'off')[]}
      scrollEnabled={false}
    />
  </Template>
)
