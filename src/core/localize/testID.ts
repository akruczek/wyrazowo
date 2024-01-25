import ui from './localization/ui.json'
import { TestIDs } from './testID.models'

export const testID = (
  id: keyof typeof TestIDs,
  suffixes?: (string | undefined)[],
): string => {
  const base = (ui as any)?.[id] ?? 'unknown_test_id'
  const _suffixes = suffixes ? suffixes.map(suffix => `_${suffix}`).join('') : ''
  return `${base}${_suffixes}`
}
