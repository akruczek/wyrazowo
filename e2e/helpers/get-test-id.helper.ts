import ui from '@core/localize/localization/ui.json'

export const getTestID = (t: string, suffixes?: (string | undefined)[]) => {
  const base = (ui as any)?.[t] ?? 'unknown_test_id'
  const _suffixes = suffixes ? suffixes.map(suffix => `_${suffix}`) : ''
  return `${base}${_suffixes}`
}
