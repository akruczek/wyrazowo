import * as React from 'react'
import { Platform, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { genericLightShadow, genericTextShadow } from '@core/shadow/shadow.constants'
import { COLOR } from '@core/colors/colors.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { isPlatform } from '@core/is-platform/is-platform'
import { HeaderSideContentConfig, HeaderType } from './header.models'
import {
  BackButtonContainer, BackButtonIcon, HeaderContainer, HeaderRightButtonContainer,
  HeaderRightButtonIndicator, HeaderRightIcon, HeaderStatusBar, HeaderText,
} from './header.styled'

interface Props {
  type: HeaderType;
  title?: string;
  backButton?: boolean;
  rightContentConfig?: HeaderSideContentConfig;
}

export const Header = ({ type, title, backButton, rightContentConfig }: Props) => {
  const navigation = useNavigation()
  const { top: topInset } = useSafeAreaInsets()
  const localize = useLocalize()

  const color: COLOR = {
    dashboard: COLOR.FIRE_BRICK,
    dictionary: COLOR.DODGER_BLUE,
    charade: COLOR.DARK_SEA_GREEN,
    more: COLOR.GOLD,
  }[type]

  return (
    <>
      {isPlatform('ios') ? (
        <HeaderStatusBar color={color} />
      ) : (
        <StatusBar backgroundColor="transparent" translucent />
      )}

      <HeaderContainer {...{ color, topInset }}>
        {backButton ? (
          <BackButtonContainer onPress={navigation.goBack} topInset={topInset}>
            <BackButtonIcon />
          </BackButtonContainer>
        ) : null}

        <HeaderText
          style={genericTextShadow}
          children={` ${title ?? localize()[type]} `}
        />

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
