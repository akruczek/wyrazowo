import { Absolute, Margin, Padding } from '@core/styled/models'

export interface StyledTxProps {
  /**
   * Define font color preset
   */
  themeColor?: 'textPrimary' | 'textSecondary';

  /**
   * Apply "font-weight: bold" style
   */
  bold?: boolean;

  /**
   * Apply "font-weight: 500" style
   */
  bolder?: boolean;

  /**
   * Apply "text-align: center" style
   */
  center?: boolean;

  /**
   * Apply "text-transform: uppercase" style
   */
  uppercase?: boolean;

  /**
   * Apply "text-decoration: underline" style
   */
  underline?: boolean;

  /**
   * Apply "numberOfLines={1}" property
   */
  oneLine?: boolean;

  /**
   * Apply generic text shadow
   */
  shadow?: boolean;

  /**
   * Define margin shorthand
   */
  margins?: Margin;

  /**
   * Define padding shorthand
   */
  paddings?: Padding;

  /**
   * Apply blue font color
   */
  link?: boolean;

  /**
   * Apply error font color
   */
  error?: boolean;

  /**
   * Apply OK font color
   */
  ok?: boolean;

  /**
   * Apply white font color
   */
  white?: boolean;

  /**
   * Apply black font color
   */
  black?: boolean;

  /**
   * Apply position absolute with given top-right-bottom-left values
   */
  absolute?: Absolute;

  /**
   * Apply 6px font size
   */
  XXXS?: boolean;

  /**
   * Apply 10px font size
   */
  XXS?: boolean;

  /**
   * Apply 12px font size
   */
  XS?: boolean;

  /**
   * Apply 16px font size
   */
  S?: boolean;

  /**
   * Apply 22px font size
   */
  M?: boolean;

  /**
   * Apply 28px font size
   */
  L?: boolean;

  /**
   * Apply 32px font size
   */
  XL?: boolean;

  /**
   * Apply 36px font size
   */
  XXL?: boolean;

  /**
   * Apply 42px font size
   */
  XXXL?: boolean;
}
