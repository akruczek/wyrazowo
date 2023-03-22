import styled from 'styled-components/native'
import * as R from 'ramda'
import { TEXT_SIZE } from '../core/text/text.constants'

interface MoreContainerProps {
  topInset: number;
}

export const MoreContainer = styled.View<MoreContainerProps>`
  padding: 10px;
  margin-top: ${R.propOr(0, 'topInset')}px;
`

export const MoreDisplayText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
`
