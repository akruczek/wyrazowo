import { COLOR } from '@core/colors/colors.constants'
import { ScreenType } from '@core/models'

export const screenTypeToColorMap: { [key: ScreenType | string]: COLOR } = {
  dashboard: COLOR.FIRE_BRICK,
  dictionary: COLOR.DODGER_BLUE,
  charade: COLOR.DARK_SEA_GREEN,
  more: COLOR.GOLD,
}
