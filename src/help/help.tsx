import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'
import { SCREEN } from 'navigation/navigation.constants'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '@core/colors/colors.constants'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Header } from '@core/header/header'
import { ListedOption } from '../more/components'

export const Help = () => {
  const localize = useLocalize()
  const navigation = useNavigation<any>()
  const theme = useTheme() as ThemeModel

  const data = [
    {
      title: localize().dashboard,
      icon: 'home-search',
      index: 0,
      iconColor: COLOR.FIRE_BRICK,
    },
  ]

  const renderItem = ({ item }: { item: any }) => (
    <ListedOption title={item.title} titleColor={item.iconColor}>
      <TouchableOpacity
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={() => navigation.navigate(SCREEN.MORE_HELP_GUIDELINE, { index: item.index })}
      >
        <MaterialCommunityIcons name={item.icon ?? 'help'} color={item.iconColor ?? theme.textPrimary} size={28} />
      </TouchableOpacity>
    </ListedOption>
  )

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <Header type="more" title={localize().help.toUpperCase()} backButton />
      <FlatList renderItem={renderItem} data={data} />
    </SafeAreaFlexContainer>
  )
}
