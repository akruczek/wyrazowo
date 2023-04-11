import { AnyAction, Dispatch } from '@reduxjs/toolkit'

export interface PremiumService {
  activateOnce: (dispatch?: Dispatch<AnyAction>) => Promise<void>;
  deactivateOnce: (dispatch?: Dispatch<AnyAction>) => Promise<void>;
}
