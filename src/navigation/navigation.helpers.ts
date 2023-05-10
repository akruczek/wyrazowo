export const getNavigationParam = <R>(
  param: string,
  navigation: any,
): R => {
  const navigationState = navigation?.getState?.()
  return navigationState?.routes?.[navigationState.index]?.params?.[param]
}
