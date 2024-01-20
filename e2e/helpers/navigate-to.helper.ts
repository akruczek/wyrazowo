import { getTestID } from './get-test-id.helper'

type MainNavigationScreenName = 'dashboard' | 'dictionary' | 'charade' | 'more'

export const navigateTo = async (screen: MainNavigationScreenName) => {
  await element(
    by.id(getTestID('nav_bar', [ screen ]),)
  ).atIndex(0).tap()
}
