import wrzw from 'wrzw'

export const appendStyleWhenProvided = <P>(
  styleName: string,
  propertyName: keyof P,
  suffix?: string,
) => (props: P) => wrzw.ifElse(
  `${styleName}: ${props[propertyName]}${suffix ?? ''};`,
  '',
  wrzw.exist(props[propertyName])
)
