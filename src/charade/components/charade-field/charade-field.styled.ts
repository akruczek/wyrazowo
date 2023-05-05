import * as R from 'ramda'
import styled from 'styled-components/native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants';

interface CharadeFieldContainerProps {
  count: number;
  word: string;
  content: string;
  index: number;
  isSent: boolean;
}

const getCharadeFieldContainerSize = R.pipe(
  R.propOr(5, 'count'),
  R.divide(RESPONSIVE.WIDTH(65)),
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

export const CharadeFieldContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<CharadeFieldContainerProps>`
  width: ${getCharadeFieldContainerSize}px;
  height: ${getCharadeFieldContainerSize}px;
  border-radius: ${getCharadeFieldContainerRadius}px;
  border: 1px solid ${COLOR.DIM_GREY};
  align-items: center;
  background-color: ${getCharadeFieldContainerColor};
  justify-content: center;
`

interface CharadeFieldInnerContainerProps {
  isActive: boolean;
}

const getCharadeFieldInnerContainerBorderWidth = R.pipe(
  R.propOr(false, 'isActive'),
  Number,
)

export const CharadeFieldInnerContainer = styled.View<CharadeFieldInnerContainerProps>`
  border-bottom-width: ${getCharadeFieldInnerContainerBorderWidth}px;
  boarder-color: ${COLOR.DIM_GREY};
  width: 90%;
  height: 90%;
  align-self: center;
  position: absolute;
  top: 0;
`

export const CharadeFieldContentText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${COLOR.BLACK};
`
