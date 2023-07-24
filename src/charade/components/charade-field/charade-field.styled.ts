import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'
import { getThemeProp } from '@core/styled/theme'
import { ThemeModel } from '@core/styled/models'

interface CharadeFieldContainerProps {
  count: number;
  word: string;
  content: string;
  index: number;
  isSent: boolean;
  isError: boolean;
}

const CHARADE_PLAYGROUND_FIELD_SIZE = 60

const getCharadeFieldContainerSize = R.pipe(
  R.propOr(5, 'count'),
  R.when(
    R.lt(R.__, 5),
    R.always(5),
  ),
  R.divide(RESPONSIVE.WIDTH(CHARADE_PLAYGROUND_FIELD_SIZE)),
)

const getCharadeFieldContainerRadius = R.pipe(
  getCharadeFieldContainerSize,
  R.divide(R.__, 10),
)

const getCharadeFieldContainerColor = ({ isSent, content, index, word }: CharadeFieldContainerProps) => {
  if (isSent) {
    if (word.includes(content)) {
      if (word[index] === content) {
        return COLOR.DARK_SEA_GREEN
      } else {
        return COLOR.GOLD
      }
    } else {
      return COLOR.FIRE_BRICK
    }
  } else {
    return COLOR.TRANSPARENT
  }
}

const getCharadeFieldContainerBorderColor = R.ifElse(
  R.propSatisfies(Boolean, 'isError'),
  R.always(COLOR.FIRE_BRICK),
  getThemeProp('textSecondary')
)

export const CharadeFieldContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<CharadeFieldContainerProps & ThemeProps<ThemeModel>>`
  width: ${getCharadeFieldContainerSize}px;
  height: ${getCharadeFieldContainerSize}px;
  border-radius: ${getCharadeFieldContainerRadius}px;
  border: 1px solid ${getCharadeFieldContainerBorderColor};
  align-items: center;
  background-color: ${getCharadeFieldContainerColor};
  justify-content: center;
`

interface CharadeFieldInnerContainerProps {
  isActive: boolean;
  isError: boolean;
}

const getCharadeFieldInnerContainerBorderWidth = R.pipe(
  R.propOr(false, 'isActive'),
  Number,
)

export const CharadeFieldInnerContainer = styled.View<CharadeFieldInnerContainerProps & ThemeProps<ThemeModel>>`
  border-bottom-width: ${getCharadeFieldInnerContainerBorderWidth}px;
  border-color: ${getCharadeFieldContainerBorderColor};
  width: 90%;
  height: 90%;
  align-self: center;
  position: absolute;
  top: 0;
`
