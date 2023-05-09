import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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

interface MoreBackButtonContainerProps {
  topInset?: number;
}

const getMoreBackButtonContainer = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(10),
)

export const MoreBackButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
})<MoreBackButtonContainerProps>`
  width: 30px;
  height: 30px;
  position: absolute;
  top: ${getMoreBackButtonContainer}px;
  left: 10px;
  justify-content: center;
  align-items: center;
`

export const MoreBackButtonIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'chevron-left',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))``
