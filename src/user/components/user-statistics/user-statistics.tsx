import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator } from 'react-native'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Tx } from '@core/tx'
import {
  UserStatisticsContainer, UserStatisticsDictionarlyIcon, UserStatisticsFailureIcon, UserStatisticsHeadRow,
  UserStatisticsPointsIcon, UserStatisticsRow, UserStatisticsCharadeIcon, UserStatisticsSuccessIcon,
} from './user-statistics.styled'

interface Props {
  userData: RealTimeDatabaseUserModel | null;
}

export const UserStatistics = ({ userData }: Props) => {
  const localize = useLocalize()
  const getPointsSum = R.add(
    userData?.points?.dictionarly?.value ?? 0,
    userData?.points?.charade?.value ?? 0,
  )

  return userData ? (
    <UserStatisticsContainer>
      <UserStatisticsHeadRow>
        <Tx tx={localize().statistics_headline} margins={[ 0, 10, 0, 0 ]} bold />
        <UserStatisticsPointsIcon />
        <Tx tx={getPointsSum} margins={[ 10, 0, 10, 5 ]} S />
      </UserStatisticsHeadRow>

      <UserStatisticsHeadRow>
        <UserStatisticsDictionarlyIcon />
        <Tx tx={localize().dictionarly} margins={[ 10, 0, 10, 5 ]} S />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <Tx tx={userData.points?.dictionarly?.value ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <Tx tx={userData.points?.dictionarly?.successCount ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <Tx tx={userData.points?.dictionarly?.failureCount ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>

      <UserStatisticsHeadRow>
        <UserStatisticsCharadeIcon />
        <Tx tx={localize().charade} margins={[ 10, 0, 10, 5 ]} S />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <Tx tx={userData.points?.charade?.value ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <Tx tx={userData.points?.charade?.successCount ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <Tx tx={userData.points?.charade?.failureCount ?? 0} margins={[ 0, 0, 0, 5 ]} XS />
      </UserStatisticsRow>
    </UserStatisticsContainer>
  ) : (
    <UserStatisticsContainer>
      <ActivityIndicator size="large" />
    </UserStatisticsContainer>
  )
}
