import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from '../settings/store/settings.slice'
import { dashboardReducer } from '../dashboard/store/dashboard.slice'
import { userReducer } from '../user/store/user.slice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    dashboard: dashboardReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
