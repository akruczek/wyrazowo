import { COLOR } from '@core/colors/colors.constants'
import { Localization } from '@core/localize/localize.models'

export interface MoreOption {
  tx?: string
  suffix?: string;
  local?: keyof typeof Localization;
  onChange?: () => void;
  icon?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}
