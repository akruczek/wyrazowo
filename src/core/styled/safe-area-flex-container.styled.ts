import * as R from 'ramda'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../colors/colors.constants'
import { JustifyContent } from './models';
import { appendStyleWhenProvided } from './helpers/append-style-when-provided.helper';

interface SafeAreaFlexContainerProps {
  backgroundColor?: COLOR;
  justifyContent?: JustifyContent;
  containerHeight?: number;
}

/**
 * SafeAreaView
 * @property {COLOR} [backgroundColor = COLOR.TRANSPARENT]
 * @property {JustifyContent} [justifyContent = JustifyContent]
 * @property {number} [containerHeight = number]
 * ```css
 * flex: 1;
 * background-color: ${COLOR};
 * justify-content: ${justifyContent};
 * height: ${containerHeight}%;
 * ```
 */

export const SafeAreaFlexContainer = styled(SafeAreaView)<SafeAreaFlexContainerProps>`
  flex: 1;
  background-color: ${R.propOr('transparent', 'backgroundColor')};
  ${appendStyleWhenProvided<SafeAreaFlexContainerProps>('justify-content', 'justifyContent')}
  ${appendStyleWhenProvided<SafeAreaFlexContainerProps>('height', 'containerHeight')}
`
