import { device } from 'detox'
import { navigateTo } from './helpers'

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
})
