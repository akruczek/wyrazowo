import styled, { ThemeProps } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'

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
