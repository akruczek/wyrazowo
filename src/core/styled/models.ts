import { COLOR } from '@core/colors/colors.constants'

export type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'
export type Margin = [ number ] | [ number, number ] | [ number, number, number ] | [ number, number, number, number ]
export type Padding = [ number ] | [ number, number ] | [ number, number, number ] | [ number, number, number, number ]
export type Absolute = [ number | null, number | null, number | null, number | null ]

export interface ThemeModel {
  backgroundPrimary: COLOR;
  backgroundSecondary: COLOR;
  textPrimary: COLOR;
  textSecondary: COLOR;
}
