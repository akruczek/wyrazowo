import * as React from 'react'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import { PlayButton } from '@core/play-button/play-button'
import { CustomCheckbox } from '@core/custom-checkbox/custom-checkbox'
import { CharadeSeparator } from './charade.styled'
import { useCharadePlay } from './hooks'

export const Charade = () => {
  const localize = useLocalize()
  const { handlePlayCharade, count, setCount, allowDuplicatedLetters, setAllowDuplicatedLetters } = useCharadePlay()

  return (
    <Template type="charade">
      <CustomCounter
        label={localize().words_length}
        value={count}
        range={[ 3, 9 ]}
        colorBreakpoints={[ 4, 6, 7 ]}
        setValue={setCount}
      />

      <PlayButton type="charade" onPress={handlePlayCharade} />

      <CharadeSeparator />

      <CustomCheckbox
        defaultValue={allowDuplicatedLetters}
        onChange={setAllowDuplicatedLetters}
        label={localize().allow_duplicated_letters}
      />
    </Template>
  )
}
