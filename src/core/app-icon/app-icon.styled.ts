import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { LETTER_CARD_DEFAULT_SIZE } from '@core/letter-card/letter-card.styled'
import { SPACING } from '@core/styled'

export const AppIconContainer = styled.View`
  width: ${LETTER_CARD_DEFAULT_SIZE * 3.3}px;
  align-self: center;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  background-color: ${COLOR.WHITE_SMOKE};
  padding: ${SPACING.XL}px;
  border-radius: ${LETTER_CARD_DEFAULT_SIZE * 2}px;
`
