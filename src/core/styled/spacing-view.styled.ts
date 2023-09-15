// tslint-disable
import styled from 'styled-components/native'
import { parseSpacings } from './helpers/parse-margin.helper'
import { getRTLFlexDirection } from './helpers/rtl.helper';

interface SpacingViewProps {
  /**
   * XXXS = 2
   * XXS = 4
   * XS = 8
   * S = 12
   * M = 16
   * L = 24
   * XL = 32
   * XXL = 48
   * XXXL = 96
   */
  spacings: string;

  /**
   * Define spaing type (margin or padding)
   * Default fallback to margin
   */
  type?: 'margin' | 'padding';

  RTL?: boolean;
}

const getSpacing = (props: SpacingViewProps) => {
  const spacingType = props.type ?? 'margin'
  return `${spacingType}: ${parseSpacings(props)}`
}

export const SpacingView = styled.View<SpacingViewProps>`
  ${getSpacing}
`
