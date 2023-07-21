import { Padding } from '../models'

const addPxSuffix = (value: number): string => value ? `${value}px` : String(value)

export const parsePadding = <P extends { paddings?: Padding }>({ paddings }: P): string => paddings?.length
  ? paddings.map(addPxSuffix).join(' ')
  : '0'
