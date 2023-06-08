import * as React from 'react'
import { DEFAULT_USER_POINTS } from '@core/real-time-database/real-time-database.constants'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { realTimeDatabaseService } from '@core/real-time-database/real-time-database.service'
import { noop } from '@core/noop/noop'

interface UseRealTimeUserData {
  getRealTimeDatabaseData: (uid: string) => Promise<void>;
  userData: null | RealTimeDatabaseUserModel;
}

export const useRealTimeUserData = (): UseRealTimeUserData => {
  const [ userUid, setUserUid ] = React.useState<null | string>(null)
  const [ userData, setUserData ] = React.useState<null | RealTimeDatabaseUserModel>(null)

  const getRealTimeDatabaseData = async (uid: string) => {
    const realTimeDatabaseUserDataRef = await realTimeDatabaseService.getRef(`/users/${uid}`)
    let realTimeDatabaseUserData = await realTimeDatabaseService.readOnceByRef(realTimeDatabaseUserDataRef)

    if (!realTimeDatabaseUserData.exists()) {
      await realTimeDatabaseService.pushByReference(realTimeDatabaseUserDataRef)
      await realTimeDatabaseUserDataRef.set({ uid, points: DEFAULT_USER_POINTS })
      realTimeDatabaseUserData = await realTimeDatabaseService.readOnceByRef(realTimeDatabaseUserDataRef)
    }

    setUserUid(uid)
  }

  React.useEffect(() => {
    let userListener: any = noop

    if (userUid) {
      userListener = realTimeDatabaseService.addListener(`/users/${userUid}`, (data) => {
        console.log('changed!: ', data.val())
        setUserData(data.val())
      })
    }
    return () => {
      realTimeDatabaseService.removeListener(`/users/${userUid}`, userListener)
    }
  }, [ userUid ])

  return { userData, getRealTimeDatabaseData }
}
