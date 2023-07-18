import * as React from 'react'
import { Header, HeaderProps } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { TemplateHost, TemplateSafeArea } from './template.styled'

interface Props extends HeaderProps {
  flex?: boolean;
  children: any;
  outChildren?: any;
}

export const Template = ({ flex, children, outChildren, ...headerProps }: Props) => {
  const SafeAreaContainer = flex ? SafeAreaFlexContainer : TemplateSafeArea

  return (
    <TemplateHost>
      <SafeAreaContainer>
        <Header {...headerProps} />
        {children}
      </SafeAreaContainer>
      {outChildren}
    </TemplateHost>
  )
}
