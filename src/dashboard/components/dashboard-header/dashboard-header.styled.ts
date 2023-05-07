import * as R from 'ramda'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

interface DashboardHeaderContainerProps {
  topInset: number;
}

const DASHBOARD_HEADER_HEIGHT = 75

const getDashboardHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(DASHBOARD_HEADER_HEIGHT)
)

const getDashboardMarginTop = R.propOr(0, 'topInset')

export const DashboardHeaderContainer = styled(LinearGradient).attrs(props => ({
  colors: [ COLOR.FIRE_BRICK, getThemeProp('backgroundPrimary')(props) ],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))<DashboardHeaderContainerProps>`
  flex-direction: row;
  height: ${getDashboardHeaderHeight}px;
  background-color: ${COLOR.FIRE_BRICK};
  margin-top: -${getDashboardMarginTop}px;
  padding-top: ${getDashboardMarginTop}px;
  justify-content: center;
`

export const DashboardHeaderText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${COLOR.WHITE};
  font-weight: bold;
  padding: 10px 20px 0;
`
