import * as React from 'react'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'
import type { ComponentProps } from 'react'

type MaterialDesignIconsProps = ComponentProps<typeof MaterialDesignIcons>

export type IconName = MaterialDesignIconsProps['name'] | (string & {})

type Props = Omit<MaterialDesignIconsProps, 'name'> & {
  name: IconName;
}

const Icon = ({ name, ...rest }: Props) => (
  <MaterialDesignIcons name={name as MaterialDesignIconsProps['name']} {...rest} />
)

export default Icon

export { Icon as MaterialCommunityIcons, Icon as MaterialDesignIcons }
