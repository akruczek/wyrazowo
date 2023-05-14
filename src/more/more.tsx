import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Host } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { useTheme } from 'styled-components'
import { TEXT_SIZE } from '@core/text/text.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { Header } from '@core/header/header'
import { PremiumModal, ListedOption, OptionItem, EmptyOptions } from './components'
import { MoreOption } from './more.models'
import { useMoreOptions } from './hooks/use-more-options.hook'
import { MoreContainer } from './more.styled'
import { premiumSelector } from '../settings/store/settings.selectors'

export const More = () => {
  const localize = useLocalize()
  const theme = useTheme() as ThemeModel

  const premiumModalRef = React.useRef<Modalize | null>(null)
  const premium = useSelector(premiumSelector)

  const { handleDeactivatePremium, getOptions } = useMoreOptions(premiumModalRef, premium)

  const renderItem = ({ item }: { item: MoreOption<any> }) => (
    <OptionItem {...item} {...{ handleDeactivatePremium }} />
  )

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" />

        <MoreContainer>
          <FlatList
            renderItem={renderItem}
            ListEmptyComponent={EmptyOptions}
            keyExtractor={R.propOr('', 'title')}
            extraData={[premium]}
            data={getOptions()}
          />

          <ListedOption titleSize={TEXT_SIZE.XS} title={`${localize().app_version}: ${app.version}`} />
        </MoreContainer>

        <PremiumModal modalizeRef={premiumModalRef} />
      </SafeAreaFlexContainer>
    </Host>
  )
}
