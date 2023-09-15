import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { ThemeModel, getRTLFlexDirection, getRTLRotation } from '@core/styled'

const GIF_PIXEL_RATION = 258 / 559
const GIF_HEIGHT = RESPONSIVE.HEIGHT(50)

export const GuidelineContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-horizontal: 10px;
`

export const GuidelineGif = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${GIF_HEIGHT * GIF_PIXEL_RATION}px;
  height: ${GIF_HEIGHT}px;
  border-color: ${COLOR.DIM_GREY};
  border-width: 1px;
  border-radius: 15px;
`

export const GuidelineButtonsContainer = styled.View`
  flex-direction: ${getRTLFlexDirection};
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 30px;
`

const getGuidelineButtonContainerOpacity = R.pipe(
  R.propOr(false, 'invisible'),
  R.not,
  Number,
)

interface GuidelineButtonContainerProps {
  invisible?: boolean;
}

export const GuidelineButtonContainer = styled.TouchableOpacity.attrs(({ invisible }: GuidelineButtonContainerProps) => ({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  activeOpacity: invisible ? 0 : 0.3,
}))<GuidelineButtonContainerProps>`
  align-items: center;
  justify-content: center;
  opacity: ${getGuidelineButtonContainerOpacity};
`

export const GuidelineNextIcon = styled(MaterialCommunityIcons).attrs((props: ThemeProps<ThemeModel>) => ({
  name: 'arrow-right-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))`
  ${getRTLRotation}
`

export const GuidelineBackIcon = styled(MaterialCommunityIcons).attrs((props: ThemeProps<ThemeModel>) => ({
  name: 'arrow-left-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))`
  ${getRTLRotation}
`

