import * as React from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { genericLightShadow } from '@core/shadow/shadow.constants'
import { isPlatform } from '@core/is-platform/is-platform'
import { ScreenType } from '@core/models'
import { screenTypeToColorMap } from '@core/maps/screen-type-to-color-map'
import { Localization } from '@core/localize/localize.models'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { testID } from '@core/localize/testID'
import { SCREEN } from '../../navigation/navigation.constants'
import { HeaderSideContentConfig } from './header.models'
import { useHeaderTextSize, useHeaderPress } from './hooks'
import {
  BackButtonContainer, BackButtonIcon, HeaderContainer, HeaderLeftButtonContainer, HeaderText,
  HeaderLeftIcon, HeaderRightButtonContainer, HeaderRightButtonIndicator, HeaderRightIcon, HeaderStatusBar,
} from './header.styled'

export interface HeaderProps {
  type: ScreenType;
  local?: keyof typeof Localization;
  backButton?: boolean;
  backButtonAlert?: Function;
  onTouchEnd?: () => void;
  rightContentConfig?: HeaderSideContentConfig;
  leftIcon?: string;
  leftScreen?: SCREEN;
}

export const Header = ({
  type, local, backButton, backButtonAlert, onTouchEnd, rightContentConfig, leftIcon, leftScreen,
}: HeaderProps) => {
  const RTL = useRTL()
  const { top: topInset } = useSafeAreaInsets()
  const { onHeaderTextLayout, headerTextSize } = useHeaderTextSize()
  const { onBackPress, onLeftIconPress } = useHeaderPress(leftScreen, backButtonAlert)
  const color = screenTypeToColorMap[type]

  return (
    <>
      {isPlatform('ios') ? (
        <HeaderStatusBar color={color} />
      ) : (
        <StatusBar backgroundColor="transparent" translucent />
      )}

      <HeaderContainer {...{ color, topInset, onTouchEnd, RTL }}>
        {backButton ? (
          <BackButtonContainer onPress={onBackPress} topInset={topInset}>
            <BackButtonIcon RTL={RTL} />
          </BackButtonContainer>
        ) : null}

        <HeaderText headerTextSize={headerTextSize} onLayout={onHeaderTextLayout} local={local ?? type} />

        {(leftIcon && leftScreen) ? (
          <HeaderLeftButtonContainer
            onPress={onLeftIconPress}
            style={genericLightShadow}
            topInset={topInset}
            testID={testID('header_left_icon')}
          >
            <HeaderLeftIcon icon={leftIcon} />
          </HeaderLeftButtonContainer>
        ) : null}

        {rightContentConfig ? (
          <HeaderRightButtonContainer
            onPress={rightContentConfig.onPress}
            onLongPress={rightContentConfig.onLongPress}
            style={genericLightShadow}
            topInset={topInset}
            testID={testID('header_right_icon')}
          >
            {rightContentConfig.indicator ? <HeaderRightButtonIndicator /> : null}
            <HeaderRightIcon icon={rightContentConfig.icon} />
          </HeaderRightButtonContainer>
        ) : null}
      </HeaderContainer>
    </>
  )
}
