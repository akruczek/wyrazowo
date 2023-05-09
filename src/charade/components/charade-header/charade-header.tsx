import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import {
  CharadeAbortButtonContainer, CharadeBackButtonIcon, CharadeHeaderContainer, CharadeHeaderText,
} from './charade-header.styled'

interface Props {
  isPlaying?: boolean;
}

export const CharadeHeader = ({ isPlaying }: Props) => {
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useNavigation()
  const localize = useLocalize()

  return (
    <CharadeHeaderContainer topInset={topInset}>
      {isPlaying ? (
        <CharadeAbortButtonContainer onPress={navigation.goBack} topInset={topInset}>
          <CharadeBackButtonIcon />
        </CharadeAbortButtonContainer>
      ) : null}

      <CharadeHeaderText style={genericTextShadow} children={localize().charade} />
    </CharadeHeaderContainer>
  )
}