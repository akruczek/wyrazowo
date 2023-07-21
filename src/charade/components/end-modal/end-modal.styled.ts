import styled from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { RESPONSIVE } from '@core/responsive/responsive'
import { getThemeProp } from '@core/styled/theme'

export const CharadeEndModalize = styled(Modalize).attrs(props => ({
  adjustToContentHeight: true,
  modalStyle: {
    backgroundColor: getThemeProp('backgroundPrimary')(props),
  }
}))``

export const EndModalContainer = styled.View`
  height: ${RESPONSIVE.HEIGHT(50)}px;
  margin-top: 20px;
`

export const EndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`
