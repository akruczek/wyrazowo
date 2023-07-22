import { NativeModules } from 'react-native'
import { isPlatform } from '@core/is-platform/is-platform'

export const SYSTEM_LANGUAGE = isPlatform('ios')
  ? NativeModules?.SettingsManager?.settings?.AppleLocale?.includes?.('-')
    ? NativeModules?.SettingsManager?.settings?.AppleLocale?.split?.('-')?.[0]
    : NativeModules?.SettingsManager?.settings?.AppleLocale?.split?.('_')?.[0] ??
    NativeModules?.SettingsManager?.settings?.AppleLanguages?.[0]?.includes?.('-')
      ? NativeModules?.SettingsManager?.settings?.AppleLanguages?.[0]?.split?.('-')?.[0]
      : NativeModules?.SettingsManager?.settings?.AppleLanguages?.[0]?.split?.('_')?.[0]
  : NativeModules?.I18nManager?.localeIdentifier?.split?.('_')?.[0]
