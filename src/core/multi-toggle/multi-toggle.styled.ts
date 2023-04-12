import styled from 'styled-components/native'
import { TEXT_SIZE } from '../text/text.constants'
import { COLOR } from '../colors/colors.constants'

export const MultiToggleContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
})`
  align-items: center;
  justify-content: center;
`

export const MultiToggleValue = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${COLOR.BLACK}
  font-weight: bold;
`
