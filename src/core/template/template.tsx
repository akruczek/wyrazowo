import * as React from 'react'
import { Header, HeaderProps } from '@core/header/header'
import { TemplateSafeArea, TemplateHost } from './template.styled'

interface Props extends HeaderProps {
  flex?: boolean;
  children: any;
  outChildren?: any;
}

export const Template = ({ flex, children, outChildren, ...headerProps }: Props) => (
  <TemplateHost>
    <TemplateSafeArea justifyContent={flex ? 'space-between' : undefined}>
      <Header {...headerProps} />
      {children}
    </TemplateSafeArea>
    {outChildren}
  </TemplateHost>
)
