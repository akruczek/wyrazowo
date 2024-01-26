import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomButton } from '@core/custom-button/custom-button'
import { ScreenType } from '@core/models'
import { screenTypeToColorMap } from '@core/maps/screen-type-to-color-map'
import { testID } from '@core/localize/testID'
import { PlayButtonsContainer } from './play-button.styled'

interface Props {
  type: ScreenType;
  onPress: () => void;
}

export const PlayButton = ({ type, onPress }: Props) => {
  const { top: topInset } = useSafeAreaInsets()

  const color = screenTypeToColorMap[type]

  return (
    <PlayButtonsContainer topInset={topInset}>
      <CustomButton testID={testID('play_button')} onPress={onPress} color={color} local="play" />
    </PlayButtonsContainer>
  )
}
