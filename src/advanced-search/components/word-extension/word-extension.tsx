import * as React from 'react'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { COLOR } from '@core/colors/colors.constants'
import {
  WordExtensionContainer, WordExtensionInputContainer, WordExtensionInputIcon, WordExtensionInputWrapper,
} from './word-extension.styled'

export const WordExtension = () => {
  const [ wordToExtend, setWordToExtend ] = React.useState('')

  return (
    <WordExtensionContainer>
      <WordExtensionInputContainer>
        <WordExtensionInputIcon name="arrow-expand-left" />
        <WordExtensionInputWrapper>
          <CustomTextInput
            onChange={setWordToExtend}
            value={wordToExtend}
            // state={true}
            // errorMessage={errorMessage}
            returnKeyType="send"
            onSubmit={() => null}
            maxLength={14}
            autoCapitalize="characters"
            color={COLOR.DIM_GREY}
            blurOnSubmit
            centered
          />
        </WordExtensionInputWrapper>
        <WordExtensionInputIcon name="arrow-expand-right" />
      </WordExtensionInputContainer>
    </WordExtensionContainer>
  )
}