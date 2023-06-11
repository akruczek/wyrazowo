import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { ThemeModel } from '@core/styled/models'
import { ProgressIndicator } from '@core/progress-indicator/progress-indicator'
import { DictionarlyEndModal } from '../dictionarly-end-modal/dictionarly-end-modal'
import { DictionarlySearchedText } from '../dictionarly-searched-text/dictionarly-searched-text'
import { useDictionarlyPlayProgress, useDictionarlyPlay, useDictionarlySpy } from '../../hooks'
import {
  DictionarlyContainer, DictionarlyKeyboardAvoidingView, DictionarlySendButtonContainer, DictionarlySendButtonIcon,
  DictionarlyTextInput, DictionarlyTextInputWrapper,
} from './dictionarly-play.styled'

export const DictionarlyPlay = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const modalizeRef = React.useRef<Modalize | null>(null)

  const { progress, steps, difficulty, setChances } = useDictionarlyPlayProgress(modalizeRef)

  const { wordsLength, value, wordsBefore, wordsAfter, word, state, handleChange, onSend } =
    useDictionarlyPlay(setChances, modalizeRef)

  const { onStepTouchEnd } = useDictionarlySpy(word)

  const errorMessage = (wordsLength && value.length < 10)
    ? localize().minimum_10_letters_error
    : undefined

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} backButton />
      <ProgressIndicator {...{ progress, steps, onStepTouchEnd }} />

      <DictionarlyKeyboardAvoidingView>
        <DictionarlyContainer>
          <DictionarlySearchedText searchedWords={wordsBefore} word={word} />

          <DictionarlyTextInputWrapper>
            <DictionarlyTextInput
              placeholder="..."
              onChange={handleChange}
              value={value}
              blurOnSubmit={false}
              state={state}
              disabled={progress >= steps}
              errorMessage={errorMessage}
              returnKeyType="send"
              onSubmit={onSend}
            >
              <DictionarlySendButtonContainer onPress={onSend}>
                <DictionarlySendButtonIcon />
              </DictionarlySendButtonContainer>
            </DictionarlyTextInput>
          </DictionarlyTextInputWrapper>

          <DictionarlySearchedText searchedWords={wordsAfter} word={word} />
        </DictionarlyContainer>
      </DictionarlyKeyboardAvoidingView>

      <DictionarlyEndModal {...{ word, state, wordsLength, difficulty }} modalizeRef={modalizeRef} />
    </SafeAreaFlexContainer>
  )
}
