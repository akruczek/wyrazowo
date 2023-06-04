import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
  selectedLetters: string[];
  searchHistoryTimestamp: number;
}

const initialState: DashboardState = {
  selectedLetters: [],
  searchHistoryTimestamp: new Date().getTime(),
}

export const settingsSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedLettersAction: (state, action: PayloadAction<string[]>) => {
      state.selectedLetters = action.payload
    },
    setSearchHistoryTimestampAction: (state, action: PayloadAction<number>) => {
      state.searchHistoryTimestamp = action.payload
    },
  },
})

export const {
  setSelectedLettersAction, setSearchHistoryTimestampAction,
} = settingsSlice.actions

export const dashboardReducer = settingsSlice.reducer
