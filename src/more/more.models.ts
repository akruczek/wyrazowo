import { COLOR } from '../core/colors/colors.constants'

export interface MoreOption<V> {
  title: string;
  onChange?: (newValue: V) => void;
  value?: V;
  icon?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}
