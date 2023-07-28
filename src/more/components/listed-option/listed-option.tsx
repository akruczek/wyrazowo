import * as React from 'react'
import { Tx } from '@core/tx'
import { Localization } from '@core/localize/localize.models'
import { ListedOptionContainer } from './listed-option.styled'

interface Props {
  local?: keyof typeof Localization;
  tx?: string | number;
  suffix?: string | number;
  withPadding?: boolean;
  children?: JSX.Element;
  XS?: boolean;
  error?: boolean;
  ok?: boolean;
  link?: boolean;
  staticHeight?: boolean;
}

export const ListedOption = ({ local, suffix, tx, withPadding, XS, error, ok, link, staticHeight, children }: Props) => (
  <ListedOptionContainer {...{ withPadding, staticHeight }}>
    <Tx {...{ XS, error, ok, link, local, tx, suffix }} bolder />
    {children}
  </ListedOptionContainer>
)
