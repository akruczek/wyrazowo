import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from '../settings/store/settings.slice'
import { dashboardReducer } from '../dashboard/store/dashboard.slice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    dashboard: dashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
