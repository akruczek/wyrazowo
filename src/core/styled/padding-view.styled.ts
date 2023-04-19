import styled from 'styled-components/native'
import { Padding } from './models';
import { parsePadding } from './helpers/parse-padding.helper';

interface PaddingViewProps {
  paddings: Padding;
}

/**
 * PaddingView
 * @property {Padding} [paddings]
 * ```css
 * padding: ${paddings};
 * ```
 */

export const PaddingView = styled.View<PaddingViewProps>`
  paddings: ${parsePadding};
`
