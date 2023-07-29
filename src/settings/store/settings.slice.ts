import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { NumberFlag } from '@core/models'
import { ThemeNumberFlag } from '@core/styled/theme'

export interface SettingsState {
  hapticFeedbackEnabled: NumberFlag;
  nativeSearchEngineEnabled: NumberFlag;
  darkThemeEnabled: ThemeNumberFlag;
  premium: number;
  languageCode: null | LANGUAGE_CODES;
}

const initialState: SettingsState = {
  hapticFeedbackEnabled: 1,
  nativeSearchEngineEnabled: 1,
  darkThemeEnabled: 0,
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
    setDarkThemeEnabledAction: (state, action: PayloadAction<ThemeNumberFlag>) => {
      Storage.set(STORAGE_KEY.DARK_THEME_ENABLED, String(action.payload))
      state.darkThemeEnabled = action.payload
    },
    setPremiumAction: (state, action: PayloadAction<number>) => {
      Storage.set(STORAGE_KEY.PREMIUM, String(action.payload))
      state.premium = action.payload
    },
    setLanguageCodeAction: (state, action: PayloadAction<LANGUAGE_CODES | null>) => {
      if (action.payload !== null) {
        Storage.set(STORAGE_KEY.LANGUAGE_CODE, action.payload)
        state.languageCode = action.payload
      }
    }
  },
})

export const {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction, setDarkThemeEnabledAction,
  setPremiumAction, setLanguageCodeAction,
} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
