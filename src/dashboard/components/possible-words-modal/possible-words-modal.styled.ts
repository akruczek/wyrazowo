import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollViewProps } from 'react-native'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { SPACING, getRTLFlexDirection } from '@core/styled'

export const PossibleWordsContainer = styled.View`
  width: 100%;
  height: 100%;
`

export const SearchingDatabaseContainer = styled.View`
  width: 100%;
  height: 300px;
  padding: ${SPACING.S}px;
  justify-content: center;
  align-items: center;
`

interface PossibleWordsLetterCardsContainerProps extends ScrollViewProps {
  RTL: boolean;
}

export const PossibleWordsLetterCardsContainer = styled.ScrollView
  .attrs((props: PossibleWordsLetterCardsContainerProps) => ({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
      flexDirection: getRTLFlexDirection(props),
      paddingHorizontal: SPACING.XS,
    }
  }))`
    flex-direction: ${getRTLFlexDirection};
  `

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
