import { realTimeDatabaseService } from "@core/real-time-database/real-time-database.service"

type Subtype = 'dictionarly' | 'charade'

export const userStatisticsService = {
  updatePoints: async (
    uid: string,
    points: number,
    subtype: Subtype,
  ) => {
    const realTimeDatabasePointsRef = await realTimeDatabaseService.getRef(`/users/${uid}/points/${subtype}`)
    const realTimeDatabasePoints = await realTimeDatabaseService.readOnceByRef(realTimeDatabasePointsRef)

    const newData = {
      ...realTimeDatabasePoints.val(),
      value: (realTimeDatabasePoints.val().value ?? 0) + points,
    }

    await realTimeDatabaseService.setByReference(realTimeDatabasePointsRef, newData)

    return newData
  },
  updateSuccess: async (
    uid: string,
    subtype: Subtype,
  ) => {
    const realTimeDatabasePointsRef = await realTimeDatabaseService.getRef(`/users/${uid}/points/${subtype}`)
    const realTimeDatabasePoints = await realTimeDatabaseService.readOnceByRef(realTimeDatabasePointsRef)

    const newData = {
      ...realTimeDatabasePoints.val(),
      successCount: (realTimeDatabasePoints.val().successCount ?? 0) + 1,
    }

    await realTimeDatabaseService.setByReference(realTimeDatabasePointsRef, newData)

    return newData
  },
  updateFailure: async (
    uid: string,
    subtype: Subtype,
  ) => {
    const realTimeDatabasePointsRef = await realTimeDatabaseService.getRef(`/users/${uid}/points/${subtype}`)
    const realTimeDatabasePoints = await realTimeDatabaseService.readOnceByRef(realTimeDatabasePointsRef)

    const newData = {
      ...realTimeDatabasePoints.val(),
      failureCount: (realTimeDatabasePoints.val().failureCount ?? 0) + 1,
    }

    await realTimeDatabaseService.setByReference(realTimeDatabasePointsRef, newData)

    return newData
  },
}
