import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'
import { SCREEN } from 'navigation/navigation.constants'
import { useNavigation } from '@react-navigation/native'
import { ThemeModel } from '@core/styled/models'
import { Template } from '@core/template/template'
import { ListedOption } from '../more/components'
import { HELP_DATA } from './help.constants'

export const Help = () => {
  const navigation = useNavigation<any>()
  const theme = useTheme() as ThemeModel

  const renderItem = ({ item: { local, icon, index, iconColor, error, ok, link, hidden } }: { item: any }) =>
    hidden ? null : (
      <ListedOption {...{ error, link, ok, local }} staticHeight>
        <TouchableOpacity
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={() => navigation.navigate(SCREEN.MORE_HELP_GUIDELINE, { index })}
        >
          <MaterialCommunityIcons name={icon ?? 'help'} color={iconColor ?? theme.textPrimary} size={28} />
        </TouchableOpacity>
      </ListedOption>
    )

  return (
    <Template type="more" local="help" backButton flex>
      <FlatList renderItem={renderItem} data={HELP_DATA} />
    </Template>
  )
}
