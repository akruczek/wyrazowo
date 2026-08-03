import * as React from 'react'
import { useSelector } from 'react-redux'
import { trigger, HapticFeedbackTypes, type HapticOptions } from 'react-native-haptic-feedback'
import { hapticFeedbackEnabledSelector } from '../../settings/store/settings.selectors'

interface UseHapticFeedback {
  triggerHaptic: (type?: HapticFeedbackTypes, options?: HapticOptions) => void;
}

export const useHapticFeedback = (): UseHapticFeedback => {
  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)

  const triggerHaptic = React.useCallback((type?: HapticFeedbackTypes, options?: HapticOptions) => {
    if (hapticFeedbackEnabled) {
      const defaultOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      }

      trigger(type ?? HapticFeedbackTypes.impactLight, options ?? defaultOptions)
    }
  }, [ hapticFeedbackEnabled ])

  return { triggerHaptic }
}
