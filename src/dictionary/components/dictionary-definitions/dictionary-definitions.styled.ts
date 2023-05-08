import styled from 'styled-components/native'
import { TEXT_SIZE } from '@core/text/text.constants'
import { getThemeProp } from '@core/styled/theme'

export const DictionaryDefinitionsContainer = styled.View`
  margin-top: 20px;
  padding-horizontal: 10px;
`

export const DictionaryDefinitionText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${getThemeProp('textPrimary')};
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
