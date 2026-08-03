import * as React from 'react'
import { DEFAULT_USER_POINTS } from '@core/real-time-database/real-time-database.constants'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { realTimeDatabaseService } from '@core/real-time-database/real-time-database.service'

interface UseRealTimeUserData {
  getRealTimeDatabaseData: (uid: string) => Promise<void>;
  userData: null | RealTimeDatabaseUserModel;
}

export const useRealTimeUserData = (): UseRealTimeUserData => {
  const [ userUid, setUserUid ] = React.useState<null | string>(null)
  const [ userData, setUserData ] = React.useState<null | RealTimeDatabaseUserModel>(null)

  const getRealTimeDatabaseData = async (uid: string) => {
    const realTimeDatabaseUserDataRef = realTimeDatabaseService.getRef(`/users/${uid}`)
    let realTimeDatabaseUserData = await realTimeDatabaseService.readOnceByRef(realTimeDatabaseUserDataRef)

    if (!realTimeDatabaseUserData.exists()) {
      await realTimeDatabaseService.pushByReference(realTimeDatabaseUserDataRef)
      await realTimeDatabaseService.setByReference(realTimeDatabaseUserDataRef, {
        uid,
        points: DEFAULT_USER_POINTS,
      })
      realTimeDatabaseUserData = await realTimeDatabaseService.readOnceByRef(realTimeDatabaseUserDataRef)
    }

    setUserUid(uid)
  }

  React.useEffect(() => {
    if (!userUid) {
      return
    }

    const unsubscribe = realTimeDatabaseService.addListener(`/users/${userUid}`, (data) => {
      setUserData(data.val())
    })

    return unsubscribe
  }, [ userUid ])

  return { userData, getRealTimeDatabaseData }
}
