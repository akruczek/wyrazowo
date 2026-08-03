import * as R from 'ramda'
import styled from 'styled-components/native'
import { ThemeProps } from '@core/styled/models'
import MaterialCommunityIcons from '@core/icon/icon'
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

export const GuidelineButtonsContainer = styled.View<{ RTL?: boolean }>`
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

export const GuidelineButtonContainer = styled.TouchableOpacity.attrs(({ invisible }: any) => ({
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

export const GuidelineNextIcon = styled(MaterialCommunityIcons).attrs((props: any) => ({
  name: 'arrow-right-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))<{ RTL?: boolean }>`
  ${getRTLRotation}
`

export const GuidelineBackIcon = styled(MaterialCommunityIcons).attrs((props: any) => ({
  name: 'arrow-left-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))<{ RTL?: boolean }>`
  ${getRTLRotation}
`

