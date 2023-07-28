import styled, { ThemeProps } from 'styled-components/native'
import { SPACING, ThemeModel, getThemeProp } from '@core/styled'
import { RESPONSIVE } from '@core/responsive/responsive'

interface ListedOptionContainerProps {
  withPadding?: boolean;
  staticHeight?: boolean;
}

const getListedOptionContainerMargin = ({ withPadding }: ListedOptionContainerProps) =>
  withPadding ? 'margin-horizontal: 10px;' : ''

const getListedOptionContainerMinHeight = ({ staticHeight }: ListedOptionContainerProps) =>
  staticHeight ? `min-height: ${RESPONSIVE.WIDTH(13)}px;` : `padding-bottom: ${SPACING.XXS}px;`

export const ListedOptionContainer = styled.View<ThemeProps<ThemeModel> & ListedOptionContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${SPACING.M}px;
  ${getListedOptionContainerMargin}
  border-bottom-width: 1px;
  border-bottom-color: ${getThemeProp('textSecondary')}50;
  align-items: center;
  ${getListedOptionContainerMinHeight}
`
