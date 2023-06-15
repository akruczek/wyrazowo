import styled, { ThemeProps } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from '@core/styled/models'

export const DictionarlyEndModalize = styled(Modalize).attrs(props => ({
  adjustToContentHeight: true,
  modalStyle: {
    backgroundColor: getThemeProp('backgroundPrimary')(props)
  }
}))``

export const DictionarlyEndModalContainer = styled.View`
  height: 300px;
  margin-top: 50px;
  align-items: center;
`

export const DictionarlyModalText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${getThemeProp('textPrimary')};
`

interface DictionarlyModalLabelProps {
  state: boolean | null;
}

const getDictionarlyModalLabelColor = ({ state }: DictionarlyModalLabelProps & ThemeProps<ThemeModel>) =>
  state === true ? COLOR.DARK_SEA_GREEN : COLOR.FIRE_BRICK

export const DictionarlyModalLabel = styled.Text<DictionarlyModalLabelProps & ThemeProps<ThemeModel>>`
  font-size: ${TEXT_SIZE.L}px;
  color: ${getDictionarlyModalLabelColor};
`

export const DictionarlyEndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`