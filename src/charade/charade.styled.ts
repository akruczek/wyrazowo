import styled from 'styled-components/native'
import { BOTTOM_NAVIGATION_HEIGHT } from 'navigation/navigation.constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'

interface CharadeButtonsContainerProps {
  topInset: number;
}

const getCharadeButtonsContainerBottom = ({ topInset }: CharadeButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 75

export const CharadeButtonsContainer = styled.View<CharadeButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getCharadeButtonsContainerBottom}px;
`

export const CharadeSeparator = styled.View`
  border-bottom-width: 1px;
  margin: 10px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
`

export const CharadeHeadline = styled.Text`
  color: ${getThemeProp('textPrimary')};
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  text-align: center;
`

export const CharadeSwitchWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`
