import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

interface CharadeHeaderContainerProps {
  topInset: number;
}

const CHARADE_HEADER_HEIGHT = 75

const getCharadeHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(CHARADE_HEADER_HEIGHT)
)

const getCharadeMarginTop = R.propOr(0, 'topInset')

const getCharadeButtonContainerTop = R.pipe(
  getCharadeMarginTop,
  R.add(10),
)

export const CharadeHeaderContainer = styled(LinearGradient).attrs(props => ({
  colors: [ COLOR.DARK_SEA_GREEN, getThemeProp('backgroundPrimary')(props) ],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))<CharadeHeaderContainerProps>`
  flex-direction: row;
  height: ${getCharadeHeaderHeight}px;
  background-color: ${COLOR.DARK_SEA_GREEN};
  margin-top: -${getCharadeMarginTop}px;
  padding-top: ${getCharadeMarginTop}px;
  justify-content: center;
`

export const CharadeHeaderText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${COLOR.WHITE};
  font-weight: bold;
  padding: 10px 20px 0;
`

export const CharadeAbortButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
})<CharadeHeaderContainerProps>`
  width: 30px;
  height: 30px;
  position: absolute;
  top: ${getCharadeButtonContainerTop}px;
  left: 10px;
  justify-content: center;
  align-items: center;
`

export const CharadeBackButtonIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'chevron-left',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXL,
}))``
