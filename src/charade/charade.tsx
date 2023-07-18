import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { CustomCounter } from '@core/custom-counter/custom-counter'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { useCharadePlay } from './hooks'
import { Template } from '@core/template/template'
import { CharadeButtonsContainer, CharadeHeadline, CharadeSwitchWrapper, CharadeSeparator } from './charade.styled'

export const Charade = () => {
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()
  const { handlePlayCharade, count, setCount, allowDuplicatedLetters, setAllowDuplicatedLetters } = useCharadePlay()

  return (
    <Template type="charade" flex>
      <CustomCounter value={count} range={[ 3, 9 ]} setValue={setCount} />

      <CharadeButtonsContainer {...{ topInset }}>
        <CustomButton onPress={handlePlayCharade} color={COLOR.DARK_SEA_GREEN} title={localize().play} />
      </CharadeButtonsContainer>

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
