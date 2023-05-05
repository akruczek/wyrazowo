import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

export const CUSTOM_KEYBOARD_HEIGHT = RESPONSIVE.HEIGHT(30)

interface CustomKeyboardContainerProps {
  height?: number;
}

export const CustomKeyboardContainer = styled.View<CustomKeyboardContainerProps>`
  width: 100%;
  padding-bottom: 5px;
`

interface CustomKeyboardButtonContainerProps {
  rowLength: number;
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
  height: ${RESPONSIVE.WIDTH(15)}px;
  background-color: ${COLOR.DIM_GREY_LIGHTER};
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
