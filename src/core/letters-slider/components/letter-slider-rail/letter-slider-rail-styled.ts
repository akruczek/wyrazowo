import styled from 'styled-components/native'
import { COLOR } from '../../../colors/colors.constants'
import LinearGradient from 'react-native-linear-gradient'

export const LetterSliderRail = styled(LinearGradient).attrs({
  colors: [ COLOR.GOLD, COLOR.DARK_SEA_GREEN, COLOR.DODGER_BLUE, COLOR.FIRE_BRICK ],
  locations: [ 0.1, 0.2, 0.5, 0.7 ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  height: 10px;
  border-radius: 5px;
  width: 100%;
`
