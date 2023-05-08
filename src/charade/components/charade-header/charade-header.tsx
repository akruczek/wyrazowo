import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { CharadeAbortButtonContainer, CharadeHeaderContainer, CharadeHeaderText } from './charade-header.styled'

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
          <MaterialCommunityIcons name="chevron-left" color={COLOR.DIM_GREY} size={TEXT_SIZE.XXL} />
        </CharadeAbortButtonContainer>
      ) : null}

      <CharadeHeaderText style={genericTextShadow} children={localize().charade} />
    </CharadeHeaderContainer>
  )
}