import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
  selectedLetters: string[];
}

const initialState: DashboardState = {
  selectedLetters: [],
}

export const settingsSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedLettersAction: (state, action: PayloadAction<string[]>) => {
      state.selectedLetters = action.payload
    },
  },
})

export const {
  setSelectedLettersAction,
} = settingsSlice.actions

export const dashboardReducer = settingsSlice.reducer
