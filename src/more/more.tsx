import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Host } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TEXT_SIZE } from '@core/text/text.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { PremiumModal, ListedOption, OptionItem, EmptyOptions } from './components'
import { MoreOption } from './more.models'
import { useMoreOptions } from './hooks/use-more-options.hook'
import { MoreContainer, MoreStatusBar } from './more.styled'
import { nativeSearchEngineEnabledSelector, premiumSelector } from '../settings/store/settings.selectors'

// const Tab = createMaterialBottomTabNavigator();
const Tab = createNativeStackNavigator()

export const More = () => {
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()

  const premiumModalRef = React.useRef<Modalize | null>(null)
  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)
  const premium = useSelector(premiumSelector)

  const { handleDeactivatePremium, getOptions } = useMoreOptions(premiumModalRef, nativeSearchEngineEnabled, premium)

  const renderItem = ({ item }: { item: MoreOption<any> }) => (
    <OptionItem {...item} {...{ handleDeactivatePremium }} />
  )

  return (
    <Host>
      <MoreStatusBar />
      <MoreContainer topInset={topInset}>
        <FlatList
          renderItem={renderItem}
          ListEmptyComponent={EmptyOptions}
          keyExtractor={R.propOr('', 'title')}
          extraData={[nativeSearchEngineEnabled, premium]}
          data={getOptions()}
        />

        <ListedOption titleSize={TEXT_SIZE.XS} title={`${localize().app_version}: ${app.version}`} />
      </MoreContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
