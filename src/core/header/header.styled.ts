import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from '@core/icon/icon'
import LinearGradient from 'react-native-linear-gradient'
import { TextProps } from 'react-native'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { Tx } from '@core/tx'
import { getRTLFlexDirection, getRTLRotation } from '@core/styled'

interface HeaderContainerProps {
  topInset: number;
  color: COLOR;
  RTL?: boolean;
}

const HEADER_HEIGHT = 75

const getHeaderHeight = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(HEADER_HEIGHT),
)

const getPaddingTop = R.propOr(0, 'topInset')

/**
 * Plain View hosts the title/buttons. LinearGradient is an absolutely-filled
 * sibling — react-native-linear-gradient 2.x does not reliably compose children
 * under Fabric / New Architecture, which made header titles invisible.
 *
 * Template omits the top safe-area edge, so the header starts at y=0 and uses
 * paddingTop (not a negative margin) to clear the status bar / Dynamic Island.
 */
export const HeaderContainer = styled.View<HeaderContainerProps>`
  flex-direction: ${getRTLFlexDirection};
  height: ${getHeaderHeight}px;
  background-color: ${R.propOr(COLOR.GOLD, 'color')};
  padding-top: ${getPaddingTop}px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;
`

export const HeaderGradient = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  z-index: 2;
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
  z-index: 2;
`

export const BackButtonIcon = styled(MaterialCommunityIcons).attrs((props: any) => ({
  name: 'chevron-left',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXXL,
}))<{ RTL?: boolean }>`
  ${getRTLRotation}
`

interface HeaderStatusBarProps {
  color: COLOR;
}

export const HeaderStatusBar = styled(FocusAwareStatusBar).attrs(({ color }: any) => ({
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
  z-index: 2;
`

interface HeaderLeftIconProps {
  icon: string;
}

export const HeaderLeftIcon = styled(MaterialCommunityIcons).attrs(({ icon }: any) => ({
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
  z-index: 2;
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

export const HeaderRightIcon = styled(MaterialCommunityIcons).attrs(({ icon }: any) => ({
  name: icon,
  color: COLOR.WHITE,
  size: TEXT_SIZE.XL,
}))<HeaderRightIconProps>``
