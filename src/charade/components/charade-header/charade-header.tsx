import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import {
  CharadeAbortButtonContainer, CharadeBackButtonIcon, CharadeHeaderContainer, CharadeHeaderText,
} from './charade-header.styled'

interface Props {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const CharadeHeader = ({ isPlaying, setIsPlaying }: Props) => {
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()

  const handleBack = () => {
    setIsPlaying(false)
  }

  return (
    <CharadeHeaderContainer topInset={topInset}>
      {isPlaying ? (
        <CharadeAbortButtonContainer onPress={handleBack} topInset={topInset}>
          <CharadeBackButtonIcon />
        </CharadeAbortButtonContainer>
      ) : null}

      <CharadeHeaderText style={genericTextShadow} children={localize().charade} />
    </CharadeHeaderContainer>
  )
}