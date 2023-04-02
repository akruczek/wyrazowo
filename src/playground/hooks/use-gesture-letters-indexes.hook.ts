import * as React from 'react'
import * as R from 'ramda'

interface UseGestureLettersIndexes {
  incrementIndex: () => void;
  decrementIndex: () => void;
  minReached: boolean;
  maxReached: boolean;
  visibleIndex: number;
  pagingState: [ number, number ];
}

export const useGestureLettersIndexes = (
  minVisibleIndex?: number,
  maxVisibleIndex?: number,
): UseGestureLettersIndexes => {
  const MIN_VISIBLE_INDEX = minVisibleIndex ?? 0
  const MAX_VISIBLE_INDEX = maxVisibleIndex ?? 3

  const [ visibleIndex, setVisibleIndex ] = React.useState(0)

  const maxReached = visibleIndex === MAX_VISIBLE_INDEX
  const minReached = visibleIndex === MIN_VISIBLE_INDEX

  const incrementIndex = () => {
    const newIndex = R.inc(visibleIndex)

    if (newIndex <= MAX_VISIBLE_INDEX) {
      setVisibleIndex(R.inc)
    }
  }

  const decrementIndex = () => {
    const newIndex = R.dec(visibleIndex)

    if (newIndex >= MIN_VISIBLE_INDEX) {
      setVisibleIndex(R.dec)
    }
  }

  const pagingState: [ number, number ] = [ visibleIndex, MAX_VISIBLE_INDEX ]

  return { incrementIndex, decrementIndex, minReached, maxReached, visibleIndex, pagingState }
}