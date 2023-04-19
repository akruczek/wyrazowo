import * as R from 'ramda'
import styled from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'

export const ListedOptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.DIM_GREY}50;
  margin-bottom: 10px;
`

interface ListedOptionHeadlineProps {
  titleSize?: TEXT_SIZE;
}

const getListedOptionHeadline = R.propOr(TEXT_SIZE.M, 'titleSize')

export const ListedOptionHeadline = styled.Text<ListedOptionHeadlineProps>`
  font-size: ${getListedOptionHeadline}px;
  color: ${COLOR.BLACK};
  font-weight: 500;
`
