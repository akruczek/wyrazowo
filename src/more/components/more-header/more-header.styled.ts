import * as R from 'ramda'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

interface MoreHeaderContainerProps {
  topInset: number;
}

const MORE_HEADER_HEIGHT = 75

const getMoreHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(MORE_HEADER_HEIGHT)
)

const getMoreMarginTop = R.propOr(0, 'topInset')

export const MoreHeaderContainer = styled(LinearGradient).attrs(props => ({
  colors: [ COLOR.GOLD, getThemeProp('backgroundPrimary')(props) ],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))<MoreHeaderContainerProps>`
  flex-direction: row;
  height: ${getMoreHeaderHeight}px;
  background-color: ${COLOR.GOLD};
  margin-top: -${getMoreMarginTop}px;
  padding-top: ${getMoreMarginTop}px;
  justify-content: center;
`

export const MoreHeaderText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${COLOR.WHITE};
  font-weight: bold;
  padding: 10px 20px 0;
`
