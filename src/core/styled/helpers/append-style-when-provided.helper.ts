import { O } from '../../_otils'

export const appendStyleWhenProvided = <P>(
  styleName: string,
  propertyName: keyof P,
  suffix?: string,
) => (props: P) => O.ifElse(
  `${styleName}: ${props[propertyName]}${suffix ?? ''};`,
  '',
  O.exist(props[propertyName])
)
