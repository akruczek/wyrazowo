import styled, { ThemeProps } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '../text/text.constants'

export const MultiToggleContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 1000,
  },
})`
  align-items: center;
  justify-content: center;
`

export const MultiToggleValue = styled.Text<ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.S}px;
  color: ${getThemeProp('textPrimary')};
  font-weight: bold;
`
