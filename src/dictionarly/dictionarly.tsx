import * as React from 'react'
import { COLOR } from '@core/colors/colors.constants'
import { SwitchButton } from '@core/switch-button/switch-button'
import { Template } from '@core/template/template'
import { PlayButton } from '@core/play-button/play-button'
import { Tx } from '@core/tx'
import { SCREEN } from 'navigation/navigation.constants'
import { usePlayDictionarly } from './hooks'
import { DictionarlySeparator } from './dictionarly.styled'

export const Dictionarly = () => {
  const { handlePlay, wordsLength, setWordsLength, difficulty, setDifficulty } = usePlayDictionarly()

  return (
    <Template type="dictionary" local="dictionarly" leftIcon="book-alphabet" leftScreen={SCREEN.DICTIONARY_DICTIONARY}>
      <Tx local="words_length" disabled bolder center />

      <SwitchButton
        onChange={setWordsLength}
        value={wordsLength}
        labels={[ 'short', 'long' ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.FIRE_BRICK ]}
      />

      <DictionarlySeparator />

      <Tx local="difficulty" disabled bolder center />
      <SwitchButton
        onChange={setDifficulty}
        value={difficulty}
        elementsInRowCount={2}
        labels={[ 'easy', 'normal', 'hard', 'very_hard' ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.DODGER_BLUE, COLOR.GOLD, COLOR.FIRE_BRICK ]}
      />

      <PlayButton type="dictionary" onPress={handlePlay} />
    </Template>
  )
}
