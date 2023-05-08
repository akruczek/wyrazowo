import * as R from 'ramda'
import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

export const CUSTOM_KEYBOARD_HEIGHT = RESPONSIVE.HEIGHT(30)
const CUSTOM_KEYBOARD_KEY_SIZE = RESPONSIVE.WIDTH(13)

interface CustomKeyboardContainerProps {
  height?: number;
}

export const CustomKeyboardContainer = styled.View<CustomKeyboardContainerProps>`
  width: 100%;
  padding-bottom: 5px;
`

interface CustomKeyboardButtonContainerProps {
  rowLength: number;
  backgroundColor: COLOR;
}

export const CustomKeyboardRowList = styled.FlatList.attrs({
  horizontal: true,
  contentContainerStyle: {
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
})``

export const CustomKeyboardButtonContainer = styled.TouchableOpacity<CustomKeyboardButtonContainerProps>`
  height: ${CUSTOM_KEYBOARD_KEY_SIZE}px;
  background-color: ${R.propOr(COLOR.DIM_GREY_LIGHTER, 'backgroundColor')};
  width: ${({ rowLength }: CustomKeyboardButtonContainerProps) => RESPONSIVE.WIDTH(100 / rowLength) - 4}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 2px;
  padding: 5px;
`

export const CustomKeyboardText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${COLOR.BLACK};
  font-weight: bold;
`
