import { COLOR } from '@core/colors/colors.constants'
import { Localization } from '@core/localize/localize.models'

export const getHelpData = (localize: () => typeof Localization) => [
  {
    title: localize().dashboard,
    icon: 'home-search',
    index: 0,
    iconColor: COLOR.FIRE_BRICK,
    error: true,
  },
  {
    title: localize().dictionary,
    icon: 'book-alphabet',
    index: 1,
    iconColor: COLOR.DODGER_BLUE,
    link: true,
    hidden: true,
  },
  {
    title: localize().charade,
    icon: 'grid',
    index: 2,
    iconColor: COLOR.DARK_SEA_GREEN,
    ok: true,
    hidden: true,
  },
]
