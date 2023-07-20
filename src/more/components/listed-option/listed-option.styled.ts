import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'
import { COLOR } from '@core/colors/colors.constants'

interface ListedOptionContainerProps {
  withPadding?: boolean;
}

const getListedOptionContainerMargin = ({ withPadding }: ListedOptionContainerProps) =>
  withPadding ? 'margin-horizontal: 10px;' : ''

export const ListedOptionContainer = styled.View<ThemeProps<ThemeModel> & ListedOptionContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  ${getListedOptionContainerMargin}
  border-bottom-width: 1px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
  margin-bottom: 10px;
  align-items: center;
`

interface ListedOptionHeadlineProps {
  titleSize?: TEXT_SIZE;
  titleColor?: COLOR;
}

const getListedOptionHeadline = R.propOr(TEXT_SIZE.M, 'titleSize')

const getListedOptionHeadlineColor = R.ifElse(
  R.propSatisfies(Boolean, 'titleColor'),
  R.prop('titleColor'),
  getThemeProp('textPrimary'),
)

export const ListedOptionHeadline = styled.Text<ListedOptionHeadlineProps & ThemeProps<ThemeModel>>`
  font-size: ${getListedOptionHeadline}px;
  color: ${getListedOptionHeadlineColor};
  font-weight: 500;
`
