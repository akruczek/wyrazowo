import ui from '@core/localize/localization/ui.json'

export const getTestID = (t: string, suffix?: string) => {
  const base = (ui as any)?.[t] ?? 'unknown_test_id'
  return `${base}${suffix ? `_${suffix}` : ''}`
}
