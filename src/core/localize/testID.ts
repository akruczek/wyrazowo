import ui from './localization/ui.json'
import { TestIDs } from './testID.models'

export const testID = (): typeof TestIDs => (ui as typeof TestIDs)
