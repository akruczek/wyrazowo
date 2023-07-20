import * as React from 'react'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { SwitchButton } from '@core/switch-button/switch-button'
import { Template } from '@core/template/template'
import { PlayButton } from '@core/play-button/play-button'
import { usePlayDictionarly } from './hooks'
import { DictionarlyDifficultyIcon, DictionarlySeparator, DictionarlyWordsLengthIcon } from './dictionarly.styled'

export const Dictionarly = () => {
  const localize = useLocalize()
  const { handlePlay, handleNavigateToDictionary, wordsLength, setWordsLength, difficulty, setDifficulty } =
    usePlayDictionarly()

  const leftContentConfig = {
    onPress: handleNavigateToDictionary,
    icon: 'book-alphabet',
  }

  return (
    <Template type="dictionary" title={localize().dictionarly} leftContentConfig={leftContentConfig}>
      <DictionarlyWordsLengthIcon />

      <SwitchButton
        onChange={setWordsLength}
        value={wordsLength}
        labels={[ localize().short, localize().long ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.FIRE_BRICK ]}
      />

      <DictionarlySeparator />

      <DictionarlyDifficultyIcon />
      <SwitchButton
        onChange={setDifficulty}
        value={difficulty}
        elementsInRowCount={2}
        labels={[ localize().easy, localize().normal, localize().hard, localize().very_hard ]}
        colors={[ COLOR.DARK_SEA_GREEN, COLOR.DODGER_BLUE, COLOR.GOLD, COLOR.FIRE_BRICK ]}
      />

      <PlayButton type="dictionary" onPress={handlePlay} />
    </Template>
  )
}
