import { TEXT_SIZE } from '../../../core/text/text.constants'
import styled from 'styled-components/native'

export const WordDetailsModalContainer = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding-horizontal: 5px;
  justify-content: center;
  align-items: center;
`

export const WordDetailsHeadlineText = styled.Text`
  font-size: ${TEXT_SIZE.XL}px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 10px;
`

export const WordDetailsDefinitionText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

export const WordDetailsDefinitionsContainer = styled.View`
  margin-top: 10px;
`
