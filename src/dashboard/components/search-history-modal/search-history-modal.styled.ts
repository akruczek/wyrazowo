import * as R from 'ramda'
import styled from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'
import { SPACING, getRTLFlexDirection } from '@core/styled'
import { COLOR } from '@core/colors/colors.constants'

export const SearchHistoryModalContainer = styled.View`
  width: 100%;
  height: 100%;
  margin: ${SPACING.S}px ${SPACING.XXS}px 0;
  justify-content: center;
`

interface SearchHistoryModalItemContainerProps {
  withBorder?: boolean;
}

const getSearchHistoryModalItemContainerBorderWidth = R.ifElse(
  R.propSatisfies(Boolean, 'withBorder'),
  R.always(1),
  R.always(0),
)

export const SearchHistoryModalItemContainer = styled.TouchableOpacity.attrs(({ onPress }: TouchableOpacityProps) => ({
  activeOpacity: !!onPress ? 0.5 : 1,
}))<SearchHistoryModalItemContainerProps>`
  flex-direction: ${getRTLFlexDirection};
  flex-wrap: wrap;
  border-bottom-width: ${getSearchHistoryModalItemContainerBorderWidth}px;
  border-bottom-color: ${COLOR.DIM_GREY};
  margin-bottom: ${SPACING.XXS}px;
  padding-bottom: ${SPACING.XXS}px;
  align-items: center;
`

export const SearchHistoryModalNoResultsWrapper = styled.View`
  align-items: center;
`
