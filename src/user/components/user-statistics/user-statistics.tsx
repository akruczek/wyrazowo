import * as React from 'react'
import * as R from 'ramda'
import { ActivityIndicator } from 'react-native'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import {
  UserStatisticsContainer, UserStatisticsContent, UserStatisticsDictionarlyIcon, UserStatisticsFailureIcon,
  UserStatisticsHeadRow, UserStatisticsHeadline, UserStatisticsPointsIcon, UserStatisticsRow,
  UserStatisticsCharadeIcon, UserStatisticsSubHeadline, UserStatisticsSuccessIcon,
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
        <UserStatisticsHeadline children={localize().statistics_headline} />
        <UserStatisticsPointsIcon />
        <UserStatisticsSubHeadline children={getPointsSum} />
      </UserStatisticsHeadRow>

      <UserStatisticsHeadRow>
        <UserStatisticsDictionarlyIcon />
        <UserStatisticsSubHeadline children={localize().dictionarly} />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <UserStatisticsContent children={userData.points?.dictionarly?.value ?? 0} />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <UserStatisticsContent children={userData.points?.dictionarly?.successCount ?? 0} />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <UserStatisticsContent children={userData.points?.dictionarly?.failureCount ?? 0} />
      </UserStatisticsRow>

      <UserStatisticsHeadRow>
        <UserStatisticsCharadeIcon />
        <UserStatisticsSubHeadline children={localize().charade} />
      </UserStatisticsHeadRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsPointsIcon />
        <UserStatisticsContent children={userData.points?.charade?.value ?? 0} />
      </UserStatisticsRow>

      <UserStatisticsRow withMargin>
        <UserStatisticsSuccessIcon />
        <UserStatisticsContent children={userData.points?.charade?.successCount ?? 0} />
      </UserStatisticsRow>

      <UserStatisticsRow>
        <UserStatisticsFailureIcon />
        <UserStatisticsContent children={userData.points?.charade?.failureCount ?? 0} />
      </UserStatisticsRow>
    </UserStatisticsContainer>
  ) : (
    <UserStatisticsContainer>
      <ActivityIndicator size="large" />
    </UserStatisticsContainer>
  )
}
