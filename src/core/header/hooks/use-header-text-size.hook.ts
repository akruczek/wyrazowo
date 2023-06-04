import * as React from 'react'
import { LayoutChangeEvent } from 'react-native'
import { RESPONSIVE } from '@core/responsive/responsive'
import { TEXT_SIZE } from '@core/text/text.constants'

interface UseHeaderTextSize {
  headerTextSize: null | TEXT_SIZE;
  onHeaderTextLayout: (event: LayoutChangeEvent) => void;
}

export const useHeaderTextSize = (): UseHeaderTextSize => {
  const [ headerTextSize, setHeaderTextSize ] = React.useState<null | TEXT_SIZE>(null)

  const onHeaderTextLayout = (event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.width > RESPONSIVE.WIDTH(75)) {
      setHeaderTextSize(TEXT_SIZE.M)
    }
  }

  return { onHeaderTextLayout, headerTextSize }
}
