import styled, { ThemeProps } from 'styled-components/native'
import { SPACING, ThemeModel, getThemeProp } from '@core/styled'

interface ListedOptionContainerProps {
  withPadding?: boolean;
}

const getListedOptionContainerMargin = ({ withPadding }: ListedOptionContainerProps) =>
  withPadding ? 'margin-horizontal: 10px;' : ''

export const ListedOptionContainer = styled.View<ThemeProps<ThemeModel> & ListedOptionContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  padding: ${SPACING.XXS}px ${SPACING.M}px;
  ${getListedOptionContainerMargin}
  border-bottom-width: 1px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
  margin-bottom: ${SPACING.S}px;
  align-items: center;
`
