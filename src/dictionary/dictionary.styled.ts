import styled from 'styled-components/native'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'

export const DictionaryTextInput = styled(CustomTextInput).attrs({
  autoCapitalize: 'characters',
  maxLength: 15,
})``
