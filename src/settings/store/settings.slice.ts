import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'

export interface SettingsState {
  hapticFeedbackEnabled: boolean;
}

const initialState: SettingsState = {
  hapticFeedbackEnabled: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHapticFeedbackEnabledAction: (state, action: PayloadAction<boolean>) => {
      Storage.set(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, String(action.payload))
      state.hapticFeedbackEnabled = action.payload
    },
  },
})

export const {
  setHapticFeedbackEnabledAction,
} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
