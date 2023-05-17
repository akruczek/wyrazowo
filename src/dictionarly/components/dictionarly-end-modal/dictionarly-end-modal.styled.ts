import styled from 'styled-components/native'
import { getThemeProp } from '@core/styled/theme'
import { TEXT_SIZE } from '@core/text/text.constants'

export const DictionarlyEndModalContainer = styled.View`
  height: 300px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`

export const DictionarlyModalText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  color: ${getThemeProp('textPrimary')};
`

export const DictionarlyEndModalButtonsContainer = styled.View`
  position: absolute;
  bottom: 30px;
  align-self: center;
`