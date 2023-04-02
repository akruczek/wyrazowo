import { COLOR } from '../../../core/colors/colors.constants'
import styled from 'styled-components/native'

export const SelectedLettersContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  min-height: 60px;
  border-bottom-width: 1px;
  margin-horizontal: 2px;
  border-bottom-color: ${COLOR.SLATE_GREY};
`

export const SelectedLettersContainersWrapper = styled.View`
  margin-bottom: 10px;
`
