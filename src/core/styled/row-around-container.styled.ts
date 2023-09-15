import styled from 'styled-components/native'
import { getRTLFlexDirection } from './helpers/rtl.helper'

/**
 * Flex container with:
 * ```css
 * flex-direction: row;
 * justify-content: space-around;
 * ```
 */

export const RowAroundContainer = styled.View`
  flex-direction: ${getRTLFlexDirection};
  justify-content: space-around;
`
