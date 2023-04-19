import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { NumberFlag } from '@core/models'

export interface SettingsState {
  hapticFeedbackEnabled: NumberFlag;
  nativeSearchEngineEnabled: NumberFlag;
  premium: number;
  languageCode: null | LANGUAGE_CODES;
}

const initialState: SettingsState = {
  hapticFeedbackEnabled: 1,
  nativeSearchEngineEnabled: 1,
  premium: 0,
  languageCode: null,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHapticFeedbackEnabledAction: (state, action: PayloadAction<NumberFlag>) => {
      Storage.set(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, String(action.payload))
      state.hapticFeedbackEnabled = action.payload
    },
    setNativeSearchEngineEnabledAction: (state, action: PayloadAction<NumberFlag>) => {
      Storage.set(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, String(action.payload))
      state.nativeSearchEngineEnabled = action.payload
    },
    setPremiumAction: (state, action: PayloadAction<number>) => {
      Storage.set(STORAGE_KEY.PREMIUM, String(action.payload))
      state.premium = action.payload
    },
    setLanguageCodeAction: (state, action: PayloadAction<LANGUAGE_CODES | null>) => {
      if (action.payload === null) {
        Storage.remove(STORAGE_KEY.LANGUAGE_CODE)
      } else {
        Storage.set(STORAGE_KEY.LANGUAGE_CODE, String(action.payload))
      }

      state.languageCode = action.payload
    }
  },
})

export const {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction, setPremiumAction, setLanguageCodeAction,
} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
