import styled from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { getThemeProp } from '@core/styled/theme'

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

export const DictionarlyEndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`