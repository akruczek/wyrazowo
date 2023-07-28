import * as React from 'react'
import { StyledTx } from './tx.styled'
import { StyledTxProps } from './tx.models'
import { Localization } from '@core/localize/localize.models'
import { useLocalize } from '@core/hooks/use-localize.hook';

interface Props extends StyledTxProps {
  tx?: string | number;
  local?: keyof typeof Localization;
  children?: React.ReactNode;
}

export const Tx = ({ tx, local, children, ...styledTxProps }: Props) => {
  const localize = useLocalize()

  const getChildren = () => {
    const base = children ?? localize()[local as keyof typeof Localization] ?? tx
    return `${styledTxProps.prefix ?? ''}${base}${styledTxProps.suffix ?? ''}`
  }

  return (
    <StyledTx children={getChildren()} {...styledTxProps} />
  )
}
