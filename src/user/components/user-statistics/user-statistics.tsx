import * as React from 'react'
import { RealTimeDatabaseUserModel } from '@core/real-time-database/real-time-database.models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { UserStatisticsContainer, UserStatisticsContent, UserStatisticsHeadline, UserStatisticsSubHeadline } from './user-statistics.styled'

interface Props {
  userData: RealTimeDatabaseUserModel | null;
}

export const UserStatistics = ({ userData }: Props) => {
  const localize = useLocalize()

  return userData ? (
    <UserStatisticsContainer>
      <UserStatisticsHeadline children={localize().statistics_headline} />
      <UserStatisticsSubHeadline children={`Points: ${userData.points?.value ?? 0}`} />

      <UserStatisticsSubHeadline children={localize().dictionarly} />
      <UserStatisticsContent children={`Points: ${userData.points?.dictionarly?.value ?? 0}`} withMargin />
      <UserStatisticsContent children={`Success: ${userData.points?.dictionarly?.successCount ?? 0}`} withMargin />
      <UserStatisticsContent children={`Failure: ${userData.points?.dictionarly?.failureCount ?? 0}`} />

      <UserStatisticsSubHeadline children={localize().charade} />
      <UserStatisticsContent children={`Points: ${userData.points?.charade?.value ?? 0}`} withMargin />
      <UserStatisticsContent children={`Success: ${userData.points?.charade?.successCount ?? 0}`} withMargin />
      <UserStatisticsContent children={`Failure: ${userData.points?.charade?.failureCount ?? 0}`} />
    </UserStatisticsContainer>
  ) : null
}
