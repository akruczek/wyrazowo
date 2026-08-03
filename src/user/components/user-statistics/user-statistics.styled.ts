import * as R from 'ramda'
import styled from 'styled-components/native'
import { ThemeProps } from '@core/styled/models'
import MaterialCommunityIcons from '@core/icon/icon'
import { SPACING, ThemeModel, getThemeProp, getRTLColumnAlignItems, getRTLFlexDirection } from '@core/styled'
import { TEXT_SIZE } from '@core/text/text.constants'
import { COLOR } from '@core/colors/colors.constants'

export const UserStatisticsContainer = styled.View<{ RTL?: boolean }>`
  margin: ${SPACING.XS}px ${SPACING.L}px 0;
  align-items: ${getRTLColumnAlignItems};
`

interface UserStatisticsRowProps {
  withMargin?: boolean;
  RTL?: boolean;
}

const UserStatisticsRowMarginBottom = R.ifElse(
  R.propSatisfies(Boolean, 'withMargin'),
  R.always(10),
  R.always(0),
)

export const UserStatisticsHeadRow = styled.View<UserStatisticsRowProps>`
  flex-direction: ${getRTLFlexDirection};
  align-items: center;
  margin-bottom: ${UserStatisticsRowMarginBottom}px;
`

export const UserStatisticsRow = styled.View<UserStatisticsRowProps>`
  flex-direction: ${getRTLFlexDirection};
  align-items: center;
  margin-left: ${SPACING.L}px;
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

export const UserStatisticsDictionarlyIcon = styled(MaterialCommunityIcons).attrs((props: any) => ({
  name: 'book-alphabet',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.M,
}))``

export const UserStatisticsCharadeIcon = styled(MaterialCommunityIcons).attrs((props: any) => ({
  name: 'grid',
  color: getThemeProp('textPrimary')(props),
  size: TEXT_SIZE.M,
}))``
