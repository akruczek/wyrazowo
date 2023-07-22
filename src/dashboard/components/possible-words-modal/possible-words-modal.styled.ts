import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING } from '@core/styled'

export const PossibleWordsContainer = styled.View`
  width: 100%;
  height: 100%;
  margin: ${SPACING.S}px ${SPACING.XXS}px 0;
`

export const SearchingDatabaseContainer = styled.View`
  width: 100%;
  height: 300px;
  padding: ${SPACING.S}px;
  justify-content: center;
  align-items: center;
`

export const PossibleWordsLetterCardsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``

export const NoResultsFoundIcon = styled(MaterialCommunityIcons).attrs({
  name: 'cancel',
  color: COLOR.SLATE_GREY,
  size: TEXT_SIZE.XXL * 2,
})``

export const PossibleWordsModalFooterButton = styled.TouchableOpacity`
  padding: ${SPACING.L}px ${SPACING.XXL}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
