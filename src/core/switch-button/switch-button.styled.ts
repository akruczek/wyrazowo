import * as R from 'ramda'
import styled, { ThemeProps } from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { ThemeModel } from '@core/styled/models'

export const SwitchButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

interface SwitchButtonProps {
  isActive: boolean;
  color?: COLOR;
}

const getSwitchButtonContainerBackgroundColor: (props: SwitchButtonProps & ThemeProps<ThemeModel>) => any = R.ifElse(
  R.propSatisfies(Boolean, 'isActive'),
  R.propOr(COLOR.DODGER_BLUE, 'color'),
  R.always(getThemeProp('backgroundSecondary')),
)

export const SwitchButtonContainer = styled.TouchableOpacity.attrs(({ isActive }: SwitchButtonProps) => ({
  activeOpacity: isActive ? 1 : 0.3,
}))<SwitchButtonProps & ThemeProps<ThemeModel>>`
  border-radius: 15px;
  background-color: ${getSwitchButtonContainerBackgroundColor};
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

const getSwitchButtonContentColor = R.ifElse(
  R.propSatisfies(Boolean, 'isActive'),
  R.always(COLOR.WHITE),
  getThemeProp('textSecondary'),
)

export const SwitchButtonContent = styled.Text<SwitchButtonProps & ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.M}px;
  color: ${getSwitchButtonContentColor};
  font-weight: bold;
`
