import { Margin } from '../models'

const addPxSuffix = (value: number): string => value ? `${value}px` : String(value)

export const parseMargin = <P extends { margins: Margin }>({ margins }: P): string => margins?.length
  ? margins.map(addPxSuffix).join(' ')
  : '0'
