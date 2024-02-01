import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const BOTTOM_NAVIGATION_HEIGHT = 75

export enum SCREEN {
  DASHBOARD = 'Dashboard',
  DASHBOARD_SEARCH = 'Dashboard-Search',
  DASHBOARD_ADVANCED_SEARCH = 'Dashboard-Advanced-Search',
  DEVELOPER = 'Developer',
  DEVELOPER_MAIN = 'Developer-Main',
  DEVELOPER_SEARCH_HISTORY = 'Developer-Search-History',
  CHARADE = 'Charade',
  CHARADE_MAIN = 'Charade-Main',
  CHARADE_PLAY = 'Charade-Play',
  CHARADE_PLAYGROUND = 'Charade-Playground',
  MORE = 'More',
  MORE_MAIN = 'More-Main',
  MORE_LANGUAGE = 'More-Language',
  MORE_THEME = 'More-Theme',
  MORE_HAPTIC = 'More-Haptic',
  MORE_MANIA = 'More-Mania',
  MORE_HELP = 'More-Help',
  MORE_AUTHOR = 'More-Author',
  MORE_HELP_MAIN = 'More-Help-Main',
  MORE_HELP_GUIDELINE = 'More-Help-Guideline',
  MORE_USER = 'More-User',
  DICTIONARY = 'Dictionary',
  DICTIONARY_DICTIONARY = 'Dictionary-Dictionary',
  DICTIONARY_DICTIONARLY = 'Dictionary-Dictionarly',
  DICTIONARY_PLAY = 'Dictionary-Play',
}

export const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
  animationDuration: 150,
}
