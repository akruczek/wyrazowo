import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@react-native-firebase/auth'

export interface UserState {
  authData: User | null;
}

const initialState: UserState = {
  authData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<User | null>) => {
      state.authData = action.payload
    },
  },
})

export const {
  setUserAction,
} = userSlice.actions

export const userReducer = userSlice.reducer
