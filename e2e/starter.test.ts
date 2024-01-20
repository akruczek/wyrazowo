import { device, expect } from "detox"
import { COLOR } from "@core/colors/colors.constants"

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('', async () => {
    // expect(element(by.id("nav_bar"))).toBeVisible()
    await element(by.id("nav_bar_dictionary")).atIndex(0).tap()
    await element(by.id("nav_bar_more")).atIndex(0).tap()
    await element(by.id("more_option_theme")).tap()
    await element(by.id("more_option_dark")).tap()
    await expect(element(by.id(`more_option_dark_icon_${COLOR.WHITE}`))).toBeVisible()
  })

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('welcome'))).toBeVisible();
  // });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
