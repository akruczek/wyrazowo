import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'

export const UserStatisticsContainer = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`

export const UserStatisticsHeadline = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  color: ${getThemeProp('textPrimary')};
`

export const UserStatisticsSubHeadline = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${getThemeProp('textPrimary')};
  margin-vertical: 10px;
`

interface UserStatisticsContentProps {
  withMargin?: boolean;
}

const getUserStatisticsContentMarginBottom = R.ifElse(
  R.propSatisfies(Boolean, 'withMargin'),
  R.always(10),
  R.always(0),
)

export const UserStatisticsContent = styled.Text<UserStatisticsContentProps & ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.XS}px;
  color: ${getThemeProp('textPrimary')};
  margin-left: 20px;
  margin-bottom: ${getUserStatisticsContentMarginBottom}px;
`
