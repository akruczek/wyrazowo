import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { FocusAwareStatusBar } from '@core/focus-aware-status-bar/focus-aware-status-bar'
import { getThemeProp } from '@core/styled/theme';

interface MoreContainerProps {
  topInset: number;
}

const getMoreContainerPaddingTop = R.pipe(
  R.propOr(0, 'topInset'),
  R.add(10),
)

export const MoreContainer = styled.View<MoreContainerProps & ThemeProps<ThemeModel>>`
  padding: 10px;
  flex: 1;
  background-color: ${getThemeProp('backgroundSecondary')};
  padding-top: ${getMoreContainerPaddingTop}px;
`

export const MoreStatusBar = styled(FocusAwareStatusBar).attrs(props => ({
  backgroundColor: getThemeProp('backgroundSecondary')(props),
  animated: true,
  barStyle: 'dark-content',
}))``
