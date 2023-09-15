import { Margin, SPACING } from '../models'

const addPxSuffix = (value: number): string => value ? `${value}px` : String(value)

export const parseMargin = <P extends { margins: Margin }>({ margins }: P): string => margins?.length
  ? margins.map(addPxSuffix).join(' ')
  : '0'

type SpacingsArray = (keyof typeof SPACING)[]

export const parseSpacings = <P extends { spacings?: string, RTL?: boolean }>({ spacings, RTL }: P): string | number => {
  const marginsArray = spacings?.split(' ')

  if (marginsArray?.length === 4) {
    if (RTL) {
      const [ top, left, bottom, right ] = marginsArray as SpacingsArray
      return `${SPACING[top] ?? 0}px ${SPACING[right] ?? 0}px ${SPACING[bottom] ?? 0}px ${SPACING[left] ?? 0}px`
    } else {
      const [ top, right, bottom, left ] = marginsArray as SpacingsArray
      return `${SPACING[top] ?? 0}px ${SPACING[right] ?? 0}px ${SPACING[bottom] ?? 0}px ${SPACING[left] ?? 0}px`
    }
  } else if (marginsArray?.length === 3) {
    const [ top, horizontal, bottom ] = marginsArray as SpacingsArray
    return `${SPACING[top] ?? 0}px ${SPACING[horizontal] ?? 0}px ${SPACING[bottom] ?? 0}px`
  } else if (marginsArray?.length === 2) {
    const [ vertical, horizontal ] = marginsArray as SpacingsArray
    return `${SPACING[vertical] ?? 0}px ${SPACING[horizontal] ?? 0}px`
  } else if (marginsArray?.length === 1) {
    const [ all ] = marginsArray as SpacingsArray
    return `${SPACING[all] ?? 0}px`
  } else {
    return 0
  }
}
