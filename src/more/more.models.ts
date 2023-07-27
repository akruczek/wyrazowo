import { COLOR } from '@core/colors/colors.constants'
import { Localization } from '@core/localize/localize.models'

export interface MoreOption<V> {
  tx?: string
  suffix?: string;
  local?: keyof typeof Localization;
  onChange?: (newValue: V) => void;
  value?: V;
  values?: V[];
  icon?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}
