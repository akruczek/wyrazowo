import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { LETTER_CARD_DEFAULT_SIZE } from '../core/letter-card/letter-card.styled'
import { COLOR } from '../core/colors/colors.constants'

const SELECTED_CARD_SPACE_SIZE = Math.floor(Dimensions.get('screen').width / 7 - LETTER_CARD_DEFAULT_SIZE)

export const LetterCardsContainer = styled.View`
  flex-flow: row wrap;
  margin-left: ${SELECTED_CARD_SPACE_SIZE - 5}px;
`

export const SelectedLettersContainer = styled.View`
  flex-flow: row wrap;
  margin-bottom: 50px;
  margin-top: 10px;
  min-height: 60px;
  border-bottom-width: 1px;
  margin-horizontal: 2px;
  margin-bottom: 20px;
  border-bottom-color: ${COLOR.SLATE_GREY};
`
