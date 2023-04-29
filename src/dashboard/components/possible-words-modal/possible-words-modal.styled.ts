import styled, { ThemeProps } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { ThemeModel } from '@core/styled/models'
import { getThemeProp } from '@core/styled/theme'

export const PossibleWordsContainer = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding-horizontal: 5px;
`

export const SearchingDatabaseContainer = styled.View`
  width: 100%;
  height: 300px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`

export const WordsGroupHeadline = styled.Text<ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.M}px;
  color: ${getThemeProp('textPrimary')};
  margin-bottom: 5px;
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
  padding: 20px 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const PossibleWordsModalFooterButtonText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${COLOR.DODGER_BLUE};
`
