import * as React from 'react'
import { Tx } from '@core/tx'
import { Localization } from '@core/localize/localize.models'
import { ListedOptionContainer } from './listed-option.styled'

interface Props {
  local?: keyof typeof Localization;
  tx?: string | number;
  suffix?: string | number;
  withPadding?: boolean;
  children?: JSX.Element | null;
  XS?: boolean;
  error?: boolean;
  ok?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  link?: boolean;
  staticHeight?: boolean;
  uppercase?: boolean;
}

export const ListedOption = ({
  local, suffix, tx, withPadding, XS, error, ok, link, staticHeight, onPress, onLongPress, children, uppercase,
}: Props) => (
  <ListedOptionContainer {...{ withPadding, staticHeight, onPress, onLongPress }}>
    <Tx {...{ XS, error, ok, link, local, tx, suffix, uppercase }} bolder />
    {children}
  </ListedOptionContainer>
)
