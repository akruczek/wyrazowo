import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

export const SearchHistoryModalContainer = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding-horizontal: 5px;
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

export const SearchHistoryModalItemContainer = styled.TouchableOpacity.attrs(({ onPress }) => ({
  activeOpacity: !!onPress ? 0.5 : 1,
}))<SearchHistoryModalItemContainerProps>`
  flex-flow: row wrap;
  border-bottom-width: ${getSearchHistoryModalItemContainerBorderWidth}px;
  border-bottom-color: ${COLOR.DIM_GREY};
  margin-bottom: 5px;
  padding-bottom: 5px;
  align-items: center;
`

export const SearchHistoryModalItemText = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  color: ${COLOR.BLACK};
  font-weight: bold;
  margin-left: 5px;
`

export const SearchHistoryModalNoResultsWrapper = styled.View`
  align-items: center;
`
