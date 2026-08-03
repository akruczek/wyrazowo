import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalHost } from '@gorhom/portal'
import { Header, HeaderProps } from '@core/header/header'
import { TemplateSafeArea, TemplateHost } from './template.styled'

interface Props extends HeaderProps {
  flex?: boolean;
  children: any;
  outChildren?: any;
}

export const Template = ({ flex, children, outChildren, ...headerProps }: Props) => (
  <BottomSheetModalProvider>
    <TemplateHost>
      <TemplateSafeArea justifyContent={flex ? 'space-between' : undefined}>
        <Header {...headerProps} />
        {children}
      </TemplateSafeArea>
      {outChildren}
      <PortalHost name="root" />
    </TemplateHost>
  </BottomSheetModalProvider>
)
