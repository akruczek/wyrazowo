import { testID } from '@core/localize/testID'

type MainNavigationScreenName = 'dashboard' | 'dictionary' | 'charade' | 'more'

export const navigateTo = async (screen: MainNavigationScreenName) => {
  await element(
    by.id(testID('nav_bar', [ screen ]))
  ).atIndex(0).tap()
}
