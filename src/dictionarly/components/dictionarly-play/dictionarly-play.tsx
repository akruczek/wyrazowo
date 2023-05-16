import * as React from 'react'
import * as R from 'ramda'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { ThemeModel } from '@core/styled/models'
import { getNavigationParam } from '../../../navigation/navigation.helpers'
import { allWordsByLength, longWordsByLength } from '../../../dashboard/helpers'
import {
  DictionarlyContainer, DictionarlySendButtonContainer, DictionarlySendButtonIcon, DictionarlyText,
  DictionarlyTextInput, DictionarlyTextInputWrapper,
} from './dictionarly-play.styled'
import { DictionarlyEndModal } from '../dictionarly-end-modal/dictionarly-end-modal'
import { DictionarlySearchedText } from '../dictionarly-searched-text/dictionarly-searched-text'
import { appendSortedWords } from 'dictionarly/helpers'
import { Text } from 'react-native'

export const DictionarlyPlay = () => {
  const DEFAULT_CHANCES = 10

  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const navigation = useNavigation()
  const modalizeRef = React.useRef<Modalize | null>(null)
  const [ chances, setChances ] = React.useState(DEFAULT_CHANCES)
  const [ state, setState ] = React.useState<boolean | null>(null)
  const [ value, setValue ] = React.useState<string>('')
  const [ wordsAfter, setWordsAfter ] = React.useState<string[]>([])
  const [ wordsBefore, setWordsBefore ] = React.useState<string[]>([])

  const word = getNavigationParam<string>('word', navigation)
  const difficulty = getNavigationParam<number>('difficulty', navigation)

  const handleChange = (newValue: string) => {
    setState(null)
    setValue(newValue)
  }

  const getWords = (words: string[]) => words
    .map((str: string) => str.length > 0 ? str.split('.') : null)
    .filter((elements: string[] | null) => elements !== null)
    .flat<any, number>()

  const onSend = () => {
    console.log(word)
    const allWords = difficulty ? getWords(longWordsByLength) : getWords(allWordsByLength)

    if (!allWords.includes(value.toLowerCase())) {
      setState(false)
      return
    }

    const comparison = value.localeCompare(word)

    if (comparison > 0) {
      setWordsAfter(appendSortedWords(value))
      setValue('')
    } else if (comparison < 0) {
      setWordsBefore(appendSortedWords(value))
      setValue('')
    } else {
      setState(true)
      modalizeRef?.current?.open?.()
    }

    setChances(R.dec)
  }

  React.useEffect(() => {
    if (!chances) {
      modalizeRef?.current?.open?.()
    }
  }, [ chances ])

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="dictionary" title={localize().dictionarly} backButton />
      <Text alignSelf="center" children={`${chances}/${DEFAULT_CHANCES}`} />

      <DictionarlyContainer>
        <DictionarlySearchedText searchedWords={wordsBefore} word={word} />

        <DictionarlyTextInputWrapper>
          <DictionarlyTextInput
            placeholder="..."
            onChange={handleChange}
            value={value}
            state={state}
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

      <DictionarlyEndModal state={state} modalizeRef={modalizeRef} />
    </SafeAreaFlexContainer>
  )
}
