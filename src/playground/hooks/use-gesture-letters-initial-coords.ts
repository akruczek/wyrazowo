import * as React from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LETTER_CARD_DEFAULT_SIZE } from '@core/letter-card/letter-card.styled'
import { RESPONSIVE } from '@core/responsive/responsive'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../navigation/navigation.constants'

interface UseGestureLettersInitialCoords {
  getInitialYPosition: (index: number) => number;
  getInitialXPosition: (rowIndex: number) => number;
  getInitialY: () => number;
  topInset: number;
  bottomInset: number;
}

export const useGestureLettersInitialCoords = (
  visibleIndex: number,
): UseGestureLettersInitialCoords => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets()

  const getInitialYPosition = (rowIndex: number) => {
    const _rowIndex = rowIndex - visibleIndex
    const _topInset = (topInset || StatusBar.currentHeight) ?? 0

    const playgroundSize = RESPONSIVE.HEIGHT() - RESPONSIVE.WIDTH() - _topInset - bottomInset - BOTTOM_NAVIGATION_HEIGHT

    return -playgroundSize + bottomInset + (LETTER_CARD_DEFAULT_SIZE * (_rowIndex + 1)) + (4 * _rowIndex) - 4
  }

  const getInitialY = React.useCallback(() => getInitialYPosition(0), [])

  const getInitialXPosition = (index: number) => {
    const paddingOffset = ((LETTER_CARD_DEFAULT_SIZE / 8) - 1) / 2

    return LETTER_CARD_DEFAULT_SIZE * index + (((LETTER_CARD_DEFAULT_SIZE / 16) - 1.5) * index) + paddingOffset
  }

  return {
    getInitialYPosition, getInitialXPosition, getInitialY,
    topInset: (topInset || StatusBar.currentHeight) ?? 0,
    bottomInset,
  }
}
