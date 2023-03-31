import styled from 'styled-components/native'
import * as R from 'ramda'
import { TEXT_SIZE } from '../core/text/text.constants'
import { COLOR } from '../core/colors/colors.constants'

interface MoreContainerProps {
  topInset: number;
}

export const MoreContainer = styled.View<MoreContainerProps>`
  padding: 10px;
  flex: 1;
  margin-top: ${R.propOr(0, 'topInset')}px;
`

export const MoreDisplayText = styled.Text`
  font-size: ${TEXT_SIZE.S}px;
  color: ${COLOR.BLACK}
`

export const MoreActivityIndicatorWrapper = styled.View`
  margin-top: 30px;
`
