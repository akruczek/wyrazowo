import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { RESPONSIVE } from '@core/responsive/responsive'

const GIF_PIXEL_RATION = 258 / 559
const GIF_HEIGHT = RESPONSIVE.HEIGHT(55)

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
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
`

export const GuidelineIndicatorText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${getThemeProp('textPrimary')};
`

export const GuidelineButtonsContainer = styled.View`
  flex-direction: row;
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

export const GuidelineButtonContainer = styled.TouchableOpacity.attrs(({ invisible }) => ({
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

export const GuidelineNextIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'arrow-right-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))``

export const GuidelineBackIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'arrow-left-bold',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.XL,
}))``

export const GuidelineDescription = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${getThemeProp('textPrimary')};
  margin-top: 20px;
  text-align: center;
`

export const GuidelineHeadline = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  color: ${getThemeProp('textPrimary')};
  text-align: center;
  padding-bottom: 10px;
`

interface GuidelineBackButtonContainerProps {
  topInset?: number;
}

const getGuidelineBackButtonContainerTop = R.pipe(
  R.propOr(0, 'topInset'),
  R.subtract(R.__, 5),
)

export const GuidelineBackButtonContainer = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  }
})<GuidelineBackButtonContainerProps>`
  position: absolute;
  left: 10px;
  z-index: 1;
  top: ${getGuidelineBackButtonContainerTop}px;
`

export const GuidelineBackButtonIcon = styled(MaterialCommunityIcons).attrs(props => ({
  name: 'chevron-left',
  color: getThemeProp('textSecondary')(props),
  size: TEXT_SIZE.XXL,
}))``