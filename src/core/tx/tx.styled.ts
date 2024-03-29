import styled, { ThemeProps } from 'styled-components/native'
import { TEXT_SIZE } from '@core/text/text.constants'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp, parseAbsolute } from '@core/styled'
import { COLOR } from '@core/colors/colors.constants'
import { parseSpacings } from '@core/styled/helpers/parse-margin.helper'
import { StyledTxProps } from './tx.models'

const getFontColor = (props: ThemeProps<ThemeModel> & StyledTxProps) => {
  if (props.error) return COLOR.FIRE_BRICK
  if (props.ok) return COLOR.DARK_SEA_GREEN
  if (props.warning) return COLOR.GOLD
  if (props.white) return COLOR.WHITE
  if (props.black) return COLOR.BLACK
  if (props.link) return COLOR.DODGER_BLUE
  if (props.disabled) return COLOR.DIM_GREY
  return getThemeProp(props.themeColor ?? 'textPrimary')(props)
}

const getTxFontSize = ({ XXXS, XXS, XS, S, M, L, XL, XXL, XXXL }: StyledTxProps) => {
  if (XXXS) return TEXT_SIZE.XXXS
  if (XXS) return TEXT_SIZE.XXS
  if (XS) return TEXT_SIZE.XS
  if (S) return TEXT_SIZE.S
  if (M) return TEXT_SIZE.M
  if (L) return TEXT_SIZE.L
  if (XL) return TEXT_SIZE.XL
  if (XXL) return TEXT_SIZE.XXL
  if (XXXL) return TEXT_SIZE.XXXL
  return TEXT_SIZE.M
}

const getShadow = ({ shadow }: StyledTxProps) => shadow ? `
  text-shadow-color: ${COLOR.DIM_GREY};
  text-shadow-radius: 7px;
` : ''

const getTxFontWeight = ({ bold, bolder }: StyledTxProps) => {
  if (bold) return 'bold'
  if (bolder) return 500
  return 'normal'
}

const getTextDecoration = ({ underline }: StyledTxProps) => underline ? 'text-decoration: underline;' : ''
const getTextTranform = ({ uppercase }: StyledTxProps) => uppercase ? 'text-transform: uppercase;' : ''
const getTxAlignment = ({ center, right }: StyledTxProps) => center
  ? 'text-align: center;'
  : right
    ? 'text-align: right;'
    : ''

const getSpacing = (props: StyledTxProps) => {
  const spacingType = props.spacingType ?? 'margin'
  return `${spacingType}: ${parseSpacings(props)};`
}

export const StyledTx = styled.Text<ThemeProps<ThemeModel> & StyledTxProps>`
  font-size: ${getTxFontSize}px;
  font-weight: ${getTxFontWeight};
  color: ${getFontColor};
  ${getSpacing}
  ${getTextDecoration}
  ${getTextTranform}
  ${getTxAlignment}
  ${getShadow}
  ${parseAbsolute}
`
