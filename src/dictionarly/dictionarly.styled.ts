import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'
import { BOTTOM_NAVIGATION_HEIGHT } from '../navigation/navigation.constants'

interface DictionarlyButtonsContainerProps {
  topInset: number;
}

const getDictionarlyButtonsContainerBottom = ({ topInset }: DictionarlyButtonsContainerProps) =>
  BOTTOM_NAVIGATION_HEIGHT - topInset + 75

export const DictionarlyButtonsContainer = styled.View<DictionarlyButtonsContainerProps>`
  position: absolute;
  align-self: center;
  bottom: ${getDictionarlyButtonsContainerBottom}px;
`

export const DictionarlyWordsLengthIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'format-letter-spacing',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.L,
}))`
  align-self: center;
  margin-top: 10px;
`

export const DictionarlyDifficultyIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'transfer-up',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.L,
}))`
  align-self: center;
`

export const DictionarlySeparator = styled.View`
  border-bottom-width: 1px;
  margin: 10px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
`
