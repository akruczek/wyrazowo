import * as React from 'react'
import { leaveGameAlert } from '@core/alerts/leave-game-alert'
import { Template } from '@core/template/template'
import { CharadePlayground } from '../charade-playground/charade-playground'
import { useCharadeWords, useCharadeSpy } from '../../hooks'

export const CharadePlay = () => {
  const { word, allWords } = useCharadeWords()
  const [end, setEnd] = React.useState(false)

  const { onTouchEnd } = useCharadeSpy(word)

  const backButtonAlert = end ? undefined : leaveGameAlert

  return (
    <Template type="charade" onTouchEnd={onTouchEnd} backButtonAlert={backButtonAlert} backButton flex>
      <CharadePlayground {...{ word, allWords, setEnd }} />
    </Template>
  )
}
