import * as React from 'react'
import { COLOR } from '@core/colors/colors.constants'
import { SwitchButton } from '@core/switch-button/switch-button'
import { Template } from '@core/template/template'
import { PlayButton } from '@core/play-button/play-button'
import { Tx } from '@core/tx'
import { usePlayDictionarly } from './hooks'
import { DictionarlySeparator } from './dictionarly.styled'

export const Dictionarly = () => {
  const { handlePlay, handleNavigateToDictionary, wordsLength, setWordsLength, difficulty, setDifficulty } =
    usePlayDictionarly()

  const leftContentConfig = {
    onPress: handleNavigateToDictionary,
    icon: 'book-alphabet',
  }

  return (
    <Template type="dictionary" local="dictionarly" leftContentConfig={leftContentConfig}>
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
