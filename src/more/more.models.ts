import { COLOR } from '@core/colors/colors.constants'

export interface MoreOption<V> {
  title: string;
  onChange?: (newValue: V) => void;
  value?: V;
  values?: V[];
  icon?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}
