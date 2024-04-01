import * as React from 'react'
import { CustomTextInput } from '@core/custom-text-input/custom-text-input'
import { COLOR } from '@core/colors/colors.constants'
import { noop } from '@core/noop/noop'
import {
  WordExtensionContainer, WordExtensionInputContainer, WordExtensionInputIcon, WordExtensionInputWrapper,
} from './word-extension.styled'

interface Props {
  wordToExtend: string;
  selectedLetters: string[];
  setWordToExtend: (wordToExtend: string) => void;
}

export const WordExtension = ({ wordToExtend, selectedLetters, setWordToExtend }: Props) => {
  return (
    <WordExtensionContainer>
      <WordExtensionInputContainer>
        <WordExtensionInputIcon name="arrow-expand-left" />
        <WordExtensionInputWrapper>
          <CustomTextInput
            onChange={setWordToExtend}
            value={wordToExtend}
            returnKeyType="send"
            onSubmit={noop}
            maxLength={15 - selectedLetters?.length}
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
