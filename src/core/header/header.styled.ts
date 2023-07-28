import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { ThemeModel } from '@core/styled/models'
import { Tx } from '@core/tx'

interface HeaderContainerProps {
  topInset: number;
  color: COLOR;
}

const HEADER_HEIGHT = 75

const getHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(HEADER_HEIGHT)
)

const getMarginTop = R.propOr(0, 'topInset')

export const HeaderContainer = styled(LinearGradient).attrs((props: HeaderContainerProps & ThemeProps<ThemeModel>) => ({
  colors: [ props.color, getThemeProp('backgroundPrimary')(props) ],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))<HeaderContainerProps>`
  flex-direction: row;
  height: ${getHeaderHeight}px;
  background-color: ${R.propOr(COLOR.GOLD, 'color')};
  margin-top: -${getMarginTop}px;
  padding-top: ${getMarginTop}px;
  justify-content: center;
  z-index: 1;
`

interface HeaderTextProps {
  headerTextSize: TEXT_SIZE | null;
}

export const HeaderText = styled(Tx).attrs({
  oneLine: true,
  center: true,
  white: true,
  bold: true,
  shadow: true,
  uppercase: true,
  spacings: '0 XXS M XXS',
  spacingType: 'padding',
})<HeaderTextProps & TextProps>`
  font-size: ${R.propOr(TEXT_SIZE.XL, 'headerTextSize')}px;
  max-width: 80%;
  align-self: center;
`

interface BackButtonContainerProps {
  topInset?: number;
}

const getBackButtonContainer = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(10),
)

export const BackButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
})<BackButtonContainerProps>`
  width: ${TEXT_SIZE.XXXL}px;
  height: ${TEXT_SIZE.XXXL}px;
  position: absolute;
  top: ${getBackButtonContainer}px;
  left: 10px;
  justify-content: center;
  align-items: center;
`

export const BackButtonIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'chevron-left',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))``

interface HeaderStatusBarProps {
  color: COLOR;
}

export const HeaderStatusBar = styled(FocusAwareStatusBar).attrs(({ color }: HeaderStatusBarProps) => ({
  backgroundColor: color,
  animated: true,
  barStyle: 'light-content',
}))<HeaderStatusBarProps>``

const getHeaderMarginTop = R.propOr(0, 'topInset')

const HeaderLeftButtonContainerTop = R.pipe(
  getHeaderMarginTop,
  R.add(10),
)

export const HeaderLeftButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 20,
    left: 20,
  },
})<BackButtonContainerProps>`
  position: absolute;
  width: ${TEXT_SIZE.XL}px;
  height: ${TEXT_SIZE.XL}px;
  top: ${HeaderLeftButtonContainerTop}px;
  left: 10px;
  justify-content: center;
  align-items: center;
`

interface HeaderLeftIconProps {
  icon: string;
}

export const HeaderLeftIcon = styled(MaterialCommunityIcons).attrs(({ icon }: HeaderLeftIconProps) => ({
  name: icon,
  color: COLOR.WHITE,
  size: TEXT_SIZE.XL,
}))<HeaderLeftIconProps>``

const HeaderRightButtonContainerTop = R.pipe(
  getHeaderMarginTop,
  R.add(10),
)

export const HeaderRightButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 20,
    left: 20,
  },
})<BackButtonContainerProps>`
  position: absolute;
  width: ${TEXT_SIZE.XL}px;
  height: ${TEXT_SIZE.XL}px;
  top: ${HeaderRightButtonContainerTop}px;
  right: 10px;
  justify-content: center;
  align-items: center;
`

export const HeaderRightButtonIndicator = styled.View`
  position: absolute;
  z-index: 1;
  elevation: 1;
  left: -2px;
  top: -2px;
  width: 12px;
  height: 12px;
  border-radius: 8px;
  background-color: ${COLOR.FIRE_BRICK};
`

interface HeaderRightIconProps {
  icon: string;
}

export const HeaderRightIcon = styled(MaterialCommunityIcons).attrs(({ icon }: HeaderRightIconProps) => ({
  name: icon,
  color: COLOR.WHITE,
  size: TEXT_SIZE.XL,
}))<HeaderRightIconProps>``
