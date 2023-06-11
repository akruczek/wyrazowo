import { useSpy } from '@core/hooks/use-spy.hook'
import * as React from 'react'

interface UseDictionarlySpy {
  onStepTouchEnd: () => void;
}

export const useDictionarlySpy = (
  word: string,
): UseDictionarlySpy => {
  const spyFlagRef = React.useRef(3)

  const { setSpyFlag } = useSpy(word)

  const onStepTouchEnd = () => {
    console.log(spyFlagRef.current)
    if (spyFlagRef.current === 0) {
      setSpyFlag(true)
    } else {
      spyFlagRef.current = spyFlagRef.current - 1
    }
  }

  return { onStepTouchEnd }
}
