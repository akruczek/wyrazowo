import * as React from 'react'
import { useSelector } from 'react-redux'
import Haptic from 'react-native-haptic-feedback'
import { hapticFeedbackEnabledSelector } from '../../settings/store/settings.selectors'

interface UseHapticFeedback {
  triggerHaptic: (type?: Haptic.HapticFeedbackTypes, options?: Haptic.HapticOptions) => void;
}

export const useHapticFeedback = (): UseHapticFeedback => {
  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)

  const triggerHaptic = React.useCallback((type?: Haptic.HapticFeedbackTypes, options?: Haptic.HapticOptions) => {
    if (hapticFeedbackEnabled) {
      const defaultOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      }

      Haptic.trigger(type ?? 'impactLight', options ?? defaultOptions)
    }
  }, [ hapticFeedbackEnabled ])

  return { triggerHaptic }
}
