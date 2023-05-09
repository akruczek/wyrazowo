import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { MoreBackButtonContainer, MoreBackButtonIcon, MoreHeaderContainer, MoreHeaderText } from './more-header.styled'

interface Props {
  title?: string;
  backButton?: boolean;
}

export const MoreHeader = ({ title, backButton }: Props) => {
  const navigation = useNavigation<any>()
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()

  return (
    <MoreHeaderContainer topInset={topInset}>
      {backButton ? (
        <MoreBackButtonContainer onPress={navigation.goBack} topInset={topInset}>
          <MoreBackButtonIcon />
        </MoreBackButtonContainer>
      ) : null}

      <MoreHeaderText style={genericTextShadow} children={title ?? localize().more} />
    </MoreHeaderContainer>
  )
}
