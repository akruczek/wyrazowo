import { ThemeProps } from 'styled-components/native'
import { COLOR } from '@core/colors/colors.constants'
import { ThemeModel } from './models'

enum LIGHT {
  backgroundPrimary = COLOR.WHITE,
  backgroundSecondary = COLOR.WHITE_SMOKE,
  textPrimary = COLOR.BLACK,
  textSecondary = COLOR.DIM_GREY,
}

enum DARK {
  backgroundPrimary = COLOR.DARK_SLATE_GREY,
  backgroundSecondary = COLOR.DIM_GREY,
  textPrimary = COLOR.WHITE,
  textSecondary = COLOR.WHITE_SMOKE,
}

export const theme = {
  light: LIGHT,
  dark: DARK,
}

export const THEME_LABELS: ('light' | 'dark' | 'auto')[] = [ 'light', 'dark', 'auto' ]

export type ThemeNumberFlag = -1 | 0 | 1

export const getThemeProp = (prop: keyof typeof LIGHT) => (props: ThemeProps<ThemeModel>) => props?.theme?.[prop]
