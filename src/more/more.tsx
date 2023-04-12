import * as React from 'react'
import app from '../../package.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { MoreActivityIndicatorWrapper, MoreContainer, MoreStatusBar } from './more.styled'
import { ListedOption } from './components/listed-option/listed-option'
import { CustomSwitch } from '../core/custom-switch/custom-switch'
import { TEXT_SIZE } from '../core/text/text.constants'
import { COLOR } from '../core/colors/colors.constants'
import { noop } from '../core/noop/noop'
import { Host } from 'react-native-portalize'
import { PremiumModal } from './components/premium-modal/premium-modal'
import { Modalize } from 'react-native-modalize'
import { MoreOption } from './more.models'
import { useMoreOptions } from './hooks/use-more-options.hook'
import { languageCodeSelector, nativeSearchEngineEnabledSelector, premiumSelector } from '../settings/store/settings.selectors'
import { useLocalize } from '../core/hooks/use-localize.hook'
import { MultiToggle } from '../core/multi-toggle/multi-toggle'
import { LANGUAGE_CODES } from '../core/localize/localize.models'
import { LANGUAGE_LABELS } from '../core/localize/localize.constants'

export const More = () => {
  const localize = useLocalize()
  const { top: topInset } = useSafeAreaInsets()

  const premiumModalRef = React.useRef<Modalize | null>(null)
  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)
  const premium = useSelector(premiumSelector)
  const languageCode = useSelector(languageCodeSelector)

  const { handleDeactivatePremium, getOptions } =
    useMoreOptions(premiumModalRef, nativeSearchEngineEnabled, premium)

  const renderItem = ({
    item: { title, value, values, hidden, icon, iconColor, onChange },
  }: { item: MoreOption<any> }) => {
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

  return (
    <Host>
      <MoreStatusBar />
      <MoreContainer topInset={topInset}>
        <FlatList
          renderItem={renderItem}
          ListEmptyComponent={(
            <MoreActivityIndicatorWrapper>
              <ActivityIndicator size="large" />
            </MoreActivityIndicatorWrapper>
          )}
          keyExtractor={({ title }) => title}
          extraData={[nativeSearchEngineEnabled, premium]}
          data={getOptions()}
        />

        <ListedOption
          titleSize={TEXT_SIZE.XS}
          title={`${localize().app_version}: ${app.version}`}
        />
      </MoreContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
