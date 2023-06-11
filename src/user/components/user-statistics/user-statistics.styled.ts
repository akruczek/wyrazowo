import * as R from 'ramda'
import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { COLOR } from '@core/colors/colors.constants'

export const UserStatisticsContainer = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`

export const UserStatisticsHeadline = styled.Text`
  font-size: ${TEXT_SIZE.M}px;
  font-weight: bold;
  color: ${getThemeProp('textPrimary')};
  margin-right: 10px;
`

export const UserStatisticsSubHeadline = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${getThemeProp('textPrimary')};
  margin-vertical: 10px;
  margin-left: 5px;
`

export const UserStatisticsContent = styled.Text`
  font-size: ${TEXT_SIZE.XS}px;
  color: ${getThemeProp('textPrimary')};
  margin-left: 5px;
`

interface UserStatisticsRowProps {
  withMargin?: boolean;
}

const UserStatisticsRowMarginBottom = R.ifElse(
  R.propSatisfies(Boolean, 'withMargin'),
  R.always(10),
  R.always(0),
)

export const UserStatisticsHeadRow = styled.View<UserStatisticsRowProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${UserStatisticsRowMarginBottom}px;
`

export const UserStatisticsRow = styled.View<UserStatisticsRowProps>`
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-bottom: ${UserStatisticsRowMarginBottom}px;
`

export const UserStatisticsPointsIcon = styled(MaterialCommunityIcons).attrs({
  name: 'star-four-points-outline',
  color: COLOR.GOLD,
  size: TEXT_SIZE.M,
})``

export const UserStatisticsSuccessIcon = styled(MaterialCommunityIcons).attrs({
  name: 'check-circle',
  color: COLOR.DARK_SEA_GREEN,
  size: TEXT_SIZE.M,
})``

export const UserStatisticsFailureIcon = styled(MaterialCommunityIcons).attrs({
  name: 'close-circle',
  color: COLOR.FIRE_BRICK,
  size: TEXT_SIZE.M,
})``

export const UserStatisticsDictionarlyIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  name: 'book-alphabet',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.M,
}))``

export const UserStatisticsCharadeIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  name: 'grid',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.M,
}))``
