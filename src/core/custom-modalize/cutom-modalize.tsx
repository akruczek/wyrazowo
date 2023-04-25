import * as React from 'react'
import { Modalize, ModalizeProps } from 'react-native-modalize'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'

interface Props {
  children: any;
  reference: React.MutableRefObject<Modalize | null>;
}

export const CustomModalize = ({ children, reference, ...modalizeProps }: ModalizeProps & Props) => {
  const theme = useTheme() as ThemeModel

  return (
    <Modalize
      ref={reference}
      modalStyle={{ backgroundColor: theme.backgroundPrimary }}
      {...modalizeProps}
    >
      {children}
    </Modalize>
  )
}
