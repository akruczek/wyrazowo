import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { Storage } from '../storage/storage'
import { STORAGE_KEY } from '../storage/storage.constants'
import { PremiumService } from './premium-service-models'
import { setPremiumAction } from '../../settings/store/settings.slice'

export const premiumService: PremiumService = {
  activateOnce: async (dispatch?: Dispatch<AnyAction>) => {
    if (dispatch) {
      dispatch(setPremiumAction(1))
    }

    Storage.set(STORAGE_KEY.PREMIUM, '1')
  },
  deactivateOnce: async (dispatch?: Dispatch<AnyAction>) => {
    if (dispatch) {
      dispatch(setPremiumAction(0))
    }

    Storage.set(STORAGE_KEY.PREMIUM, '0')
  }
}
