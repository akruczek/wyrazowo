import * as React from 'react'
import { COLOR } from '@core/colors/colors.constants'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { Template } from '@core/template/template'
import { PlayButton } from '@core/play-button/play-button'
import { CharadeHeadline, CharadeSwitchWrapper, CharadeSeparator } from './charade.styled'
import { useCharadePlay } from './hooks'

export const Charade = () => {
  const localize = useLocalize()
  const { handlePlayCharade, count, setCount, allowDuplicatedLetters, setAllowDuplicatedLetters } = useCharadePlay()

  return (
    <Template type="charade" flex>
      <CustomCounter value={count} range={[ 3, 9 ]} setValue={setCount} />
      <PlayButton type="charade" onPress={handlePlayCharade} />

      <CharadeSeparator />

      <CharadeHeadline children={localize().allow_duplicated_letters} />
      <CharadeSwitchWrapper>
        <CustomSwitch
          color={COLOR.DARK_SEA_GREEN}
          defaultValue={allowDuplicatedLetters}
          onValueChange={setAllowDuplicatedLetters}
        />
      </CharadeSwitchWrapper>
    </Template>
  )
}
