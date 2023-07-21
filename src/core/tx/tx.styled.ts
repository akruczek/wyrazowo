import styled, { ThemeProps } from 'styled-components/native'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'
import { ThemeModel } from '@core/styled/models'
import { TxPreset } from './tx.models'

export interface StyledTxProps {
  preset?: TxPreset;
  bold?: boolean;
  center?: boolean;
}

const PRESET_MAP = {
  primary: `
    font-size: ${TEXT_SIZE.M}px;
    color: ${getThemeProp('textPrimary')};
  `,
}

const FONT_SIZE_MAP = {
  primary: TEXT_SIZE.M,
}

const getFontColor = (props: ThemeProps<ThemeModel> & StyledTxProps) => ({
  primary: getThemeProp('textPrimary')(props),
})[props.preset ?? 'primary']

const getTxFontSize = ({ preset }: StyledTxProps) => preset ? FONT_SIZE_MAP[preset] : TEXT_SIZE.M
const getTxFontWeight = ({ bold }: StyledTxProps) => bold ? 'font-weight: bold;' : ''
const getTxAlignment = ({ center }: StyledTxProps) => center ? 'text-align: center;' : ''

export const StyledTx = styled.Text<ThemeProps<ThemeModel> & StyledTxProps>`
  font-size: ${getTxFontSize}px;
  color: ${getFontColor};
  ${getTxFontWeight}
  ${getTxAlignment}
`
