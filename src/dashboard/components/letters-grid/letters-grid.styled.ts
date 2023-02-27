import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { LETTER_CARD_DEFAULT_SIZE } from '../../../core/letter-card/letter-card.styled'

const SELECTED_CARD_SPACE_SIZE = Math.floor(Dimensions.get('screen').width / 7 - LETTER_CARD_DEFAULT_SIZE)

export const LetterCardsContainer = styled.View`
  flex-flow: row wrap;
  margin-left: ${SELECTED_CARD_SPACE_SIZE - 5}px;
`
