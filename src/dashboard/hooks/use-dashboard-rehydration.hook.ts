import { useRehydrateStore } from '@core/hooks/use-rehydrate-store.hook'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction, setPremiumAction,
} from '../../../src/settings/store/settings.slice'

export const useDashboardRehydration = () => {
  useRehydrateStore(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, setHapticFeedbackEnabledAction)
  useRehydrateStore(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, setNativeSearchEngineEnabledAction)
  useRehydrateStore(STORAGE_KEY.PREMIUM, setPremiumAction)
}
