import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { MoreHeaderContainer, MoreHeaderText } from './more-header.styled'

export const MoreHeader = () => {
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()

  return (
    <MoreHeaderContainer topInset={topInset}>
      <MoreHeaderText style={genericTextShadow} children={localize().more} />
    </MoreHeaderContainer>
  )
}
