import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'

export interface SettingsState {
  hapticFeedbackEnabled: boolean;
  nativeSearchEngineEnabled: boolean;
  premium: number;
}

const initialState: SettingsState = {
  hapticFeedbackEnabled: true,
  nativeSearchEngineEnabled: true,
  premium: 0,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHapticFeedbackEnabledAction: (state, action: PayloadAction<boolean>) => {
      Storage.set(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, String(action.payload))
      state.hapticFeedbackEnabled = action.payload
    },
    setNativeSearchEngineEnabledAction: (state, action: PayloadAction<boolean>) => {
      Storage.set(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, String(action.payload))
      state.nativeSearchEngineEnabled = action.payload
    },
    setPremiumAction: (state, action: PayloadAction<number>) => {
      Storage.set(STORAGE_KEY.NATIVE_SEARCH_ENGINE_ENABLED, String(action.payload))
      state.premium = action.payload
    }
  },
})

export const {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction, setPremiumAction,
} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
