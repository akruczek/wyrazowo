import * as React from 'react'
import { useSpy } from '@core/hooks/use-spy.hook'

interface UseCharadeSpy {
  onTouchEnd: () => void;
}

export const useCharadeSpy = (
  word: string,
): UseCharadeSpy => {
  const spyFlagRef = React.useRef(3)

  const { setSpyFlag } = useSpy(word)

  const onTouchEnd = () => {
    if (spyFlagRef.current === 0) {
      setSpyFlag(true)
    } else {
      spyFlagRef.current = spyFlagRef.current - 1
    }
  }

  return { onTouchEnd }
}
