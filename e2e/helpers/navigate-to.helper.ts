import { testID } from '@core/localize/testID'
import { getTestID } from './get-test-id.helper'

type MainNavigationScreenName = 'dashboard' | 'dictionary' | 'charade' | 'more'

export const navigateTo = async (screen: MainNavigationScreenName) => {
  await element(
    by.id(getTestID(testID().nav_bar, [ screen ]),)
  ).atIndex(0).tap()
}
