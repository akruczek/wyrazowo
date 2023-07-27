import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator } from 'react-native'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { Tx } from '@core/tx'
import {
  UserStatisticsContainer, UserStatisticsDictionarlyIcon, UserStatisticsFailureIcon, UserStatisticsHeadRow,
  UserStatisticsPointsIcon, UserStatisticsRow, UserStatisticsCharadeIcon, UserStatisticsSuccessIcon,
} from './user-statistics.styled'

interface Props {
  userData: RealTimeDatabaseUserModel | null;
}

export const UserStatistics = ({ userData }: Props) => {
  const getPointsSum = R.add(
    userData?.points?.dictionarly?.value ?? 0,
    userData?.points?.charade?.value ?? 0,
  )

  return userData ? (
    <UserStatisticsContainer>
      <UserStatisticsHeadRow>
        <Tx local="statistics_headline" spacings="0 S 0 0" bold />
        <UserStatisticsPointsIcon />
        <Tx tx={getPointsSum} spacings="S 0 S XXS" S />
      </UserStatisticsHeadRow>

      <UserStatisticsHeadRow>
        <UserStatisticsDictionarlyIcon />
        <Tx local="dictionarly" spacings="S 0 S XXS" S />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <Tx tx={userData.points?.dictionarly?.value ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <Tx tx={userData.points?.dictionarly?.successCount ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <Tx tx={userData.points?.dictionarly?.failureCount ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>

      <UserStatisticsHeadRow>
        <UserStatisticsCharadeIcon />
        <Tx local="charade" spacings="S 0 S XXS" S />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <Tx tx={userData.points?.charade?.value ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <Tx tx={userData.points?.charade?.successCount ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <Tx tx={userData.points?.charade?.failureCount ?? 0} spacings="0 0 0 XXS" XS />
      </UserStatisticsRow>
    </UserStatisticsContainer>
  ) : (
    <UserStatisticsContainer>
      <ActivityIndicator size="large" />
    </UserStatisticsContainer>
  )
}
