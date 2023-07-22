import { Margin, SPACING } from '../models'

const addPxSuffix = (value: number): string => value ? `${value}px` : String(value)

export const parseMargin = <P extends { margins: Margin }>({ margins }: P): string => margins?.length
  ? margins.map(addPxSuffix).join(' ')
  : '0'

type SpacingsArray = (keyof typeof SPACING)[]

export const parseSpacings = <P extends { spacings?: string }>({ spacings }: P): string | number => {
  // "S XS L M"
  const marignsArray = spacings?.split(' ')

  if (marignsArray?.length === 4) {
    const [ top, right, bottom, left ] = marignsArray as SpacingsArray
    return `${SPACING[top] ?? 0}px ${SPACING[right] ?? 0}px ${SPACING[bottom] ?? 0}px ${SPACING[left] ?? 0}px`
  } else if (marignsArray?.length === 3) {
    const [ top, horizontal, bottom ] = marignsArray as SpacingsArray
    return `${SPACING[top] ?? 0}px ${SPACING[horizontal] ?? 0}px ${SPACING[bottom] ?? 0}px`
  } else if (marignsArray?.length === 2) {
    const [ vertical, horizontal ] = marignsArray as SpacingsArray
    return `${SPACING[vertical] ?? 0}px ${SPACING[horizontal] ?? 0}px`
  } else if (marignsArray?.length === 1) {
    const [ all ] = marignsArray as SpacingsArray
    return `${SPACING[all] ?? 0}px`
  } else {
    return 0
  }
}
