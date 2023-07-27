import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { Template } from '@core/template/template'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { ProgressIndicator } from '@core/progress-indicator/progress-indicator'
import { leaveGameAlert } from '@core/alerts/leave-game-alert'
import { DictionarlyEndModal } from '../dictionarly-end-modal/dictionarly-end-modal'
import { DictionarlySearchedText } from '../dictionarly-searched-text/dictionarly-searched-text'
import { useDictionarlyPlayProgress, useDictionarlyPlay, useDictionarlySpy } from '../../hooks'
import {
  DictionarlyContainer, DictionarlyKeyboardAvoidingView, DictionarlySendButtonContainer, DictionarlySendButtonIcon,
  DictionarlyTextInput, DictionarlyTextInputWrapper,
} from './dictionarly-play.styled'

export const DictionarlyPlay = () => {
  const localize = useLocalize()
  const modalizeRef = React.useRef<Modalize | null>(null)

  const { progress, steps, difficulty, setChances } = useDictionarlyPlayProgress(modalizeRef)

  const { wordsLength, value, wordsBefore, wordsAfter, word, state, handleChange, onSend } =
    useDictionarlyPlay(setChances, modalizeRef)

  const { onStepTouchEnd } = useDictionarlySpy(word)

  const errorMessage = (wordsLength && value.length < 10)
    ? localize().minimum_10_letters_error
    : undefined

  const backButtonAlert = progress === steps ? undefined : leaveGameAlert

  return (
    <Template type="dictionary" local="dictionarly" backButtonAlert={backButtonAlert} backButton flex>
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
    </Template>
  )
}
