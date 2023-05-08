import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { DashboardHeaderContainer, DashboardHeaderText } from './dashboard-header.styled'

export const DashboardHeader = () => {
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()

  return (
    <DashboardHeaderContainer topInset={topInset}>
      <DashboardHeaderText style={genericTextShadow} children={localize().dashboard} />
    </DashboardHeaderContainer>
  )
}