import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { MultiToggle } from '@core/multi-toggle/multi-toggle'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { LANGUAGE_LABELS } from '@core/localize/localize.constants'
import { CustomSwitch } from '@core/custom-switch/custom-switch'
import { noop } from '@core/noop/noop'
import { ListedOption } from '../listed-option/listed-option'
import { languageCodeSelector } from '../../../settings/store/settings.selectors'

interface Props {
  title: string;
  onChange?: (newValue: any) => void;
  handleDeactivatePremium: () => void;
  value?: any;
  values?: any[];
  icon?: string;
  iconColor?: COLOR;
  hidden?: boolean;
}

export const OptionItem = ({
  title, value, values, hidden, icon, iconColor, onChange, handleDeactivatePremium,
}: Props) => {
  const languageCode = useSelector(languageCodeSelector)

  if (hidden) return null

  if (values !== undefined) {
    return (
      <ListedOption title={title}>
        <MultiToggle
          values={Object.values(LANGUAGE_CODES)}
          value={languageCode}
          labels={LANGUAGE_LABELS}
          onChange={onChange}
        />
      </ListedOption>
    )
  }

  if (value !== undefined) {
    return (
      <ListedOption title={title}>
        <CustomSwitch defaultValue={value} onValueChange={onChange ?? noop} />
      </ListedOption>
    )
  }

  return (
    <ListedOption title={title}>
      <TouchableOpacity
        activeOpacity={Number(!onChange)}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={onChange}
        onLongPress={handleDeactivatePremium}
      >
        <MaterialCommunityIcons name={icon ?? 'help'} color={iconColor ?? COLOR.BLACK} size={28} />
      </TouchableOpacity>
    </ListedOption>
  )
}
