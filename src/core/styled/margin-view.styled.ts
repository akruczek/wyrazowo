import styled from 'styled-components/native'
import { Margin } from './models';
import { parseMargin } from './helpers/parse-margin.styled';

interface MarginViewProps {
  margins: Margin;
}

/**
 * MarginView
 * @property {Margin} [margins]
 * ```css
 * margin: ${margins};
 * ```
 */

export const MarginView = styled.View<MarginViewProps>`
  margin: ${parseMargin};
`
