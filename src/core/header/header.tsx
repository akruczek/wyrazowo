import * as React from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { genericLightShadow } from '@core/shadow/shadow.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { isPlatform } from '@core/is-platform/is-platform'
import { ScreenType } from '@core/models'
import { screenTypeToColorMap } from '@core/maps/screen-type-to-color-map'
import { HeaderSideContentConfig } from './header.models'
import { useHeaderTextSize } from './hooks/use-header-text-size.hook'
import {
  BackButtonContainer, BackButtonIcon, HeaderContainer, HeaderLeftButtonContainer, HeaderLeftButtonIndicator,
  HeaderLeftIcon, HeaderRightButtonContainer, HeaderRightButtonIndicator, HeaderRightIcon, HeaderStatusBar, HeaderText,
} from './header.styled'

export interface HeaderProps {
  type: ScreenType;
  title?: string;
  backButton?: boolean;
  backButtonAlert?: Function;
  onTouchEnd?: () => void;
  rightContentConfig?: HeaderSideContentConfig;
  leftContentConfig?: HeaderSideContentConfig;
}

export const Header = ({ type, title, backButton, backButtonAlert, onTouchEnd, rightContentConfig, leftContentConfig }: HeaderProps) => {
  const navigation = useNavigation()
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()
  const { onHeaderTextLayout, headerTextSize } = useHeaderTextSize()

  const color = screenTypeToColorMap[type]

  const onBackPress = () => {
    if (backButtonAlert) {
      backButtonAlert(localize, navigation.goBack)
    } else {
      navigation.goBack()
    }
  }

  return (
    <>
      {isPlatform('ios') ? (
        <HeaderStatusBar color={color} />
      ) : (
        <StatusBar backgroundColor="transparent" translucent />
      )}

      <HeaderContainer onTouchEnd={onTouchEnd} {...{ color, topInset }}>
        {backButton ? (
          <BackButtonContainer onPress={onBackPress} topInset={topInset}>
            <BackButtonIcon />
          </BackButtonContainer>
        ) : null}

        <HeaderText
          headerTextSize={headerTextSize}
          onLayout={onHeaderTextLayout}
          children={` ${title ?? localize()[type]} `}
        />

        {leftContentConfig ? (
          <HeaderLeftButtonContainer
            onPress={leftContentConfig.onPress}
            onLongPress={leftContentConfig.onLongPress}
            style={genericLightShadow}
            topInset={topInset}
          >
            {leftContentConfig.indicator ? <HeaderLeftButtonIndicator /> : null}
            <HeaderLeftIcon icon={leftContentConfig.icon} />
          </HeaderLeftButtonContainer>
        ) : null}

        {rightContentConfig ? (
          <HeaderRightButtonContainer
            onPress={rightContentConfig.onPress}
            onLongPress={rightContentConfig.onLongPress}
            style={genericLightShadow}
            topInset={topInset}
          >
            {rightContentConfig.indicator ? <HeaderRightButtonIndicator /> : null}
            <HeaderRightIcon icon={rightContentConfig.icon} />
          </HeaderRightButtonContainer>
        ) : null}
      </HeaderContainer>
    </>
  )
}
