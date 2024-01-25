import { device } from 'detox'
import { navigateTo } from './helpers'
import { testID } from '@core/localize/testID'

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  it('starter', async () => {
    await navigateTo('more')
    await navigateTo('charade')
    await navigateTo('dictionary')
    await navigateTo('dashboard')
  })

  element(by.id(testID('more_option'))).tap()
})
