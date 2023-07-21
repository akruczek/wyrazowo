import { Absolute } from '../models'

export const parseAbsolute = <P extends { absolute?: Absolute }>({ absolute }: P): string => {
  if (!absolute?.length) return ''
  return `
    position: absolute;
    ${absolute[0] !== null ? `top: ${absolute[0] ? `${absolute[0]}px;` : '0;'}` : ''}
    ${absolute[1] !== null ? `right: ${absolute[1] ? `${absolute[1]}px;` : '0;'}` : ''}
    ${absolute[2] !== null ? `bottom: ${absolute[2] ? `${absolute[2]}px;` : '0;'}` : ''}
    ${absolute[3] !== null ? `left: ${absolute[3] ? `${absolute[3]}px;` : '0;'}` : ''}
  `
}
