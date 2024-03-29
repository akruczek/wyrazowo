import * as React from 'react'
import { Localization } from '@core/localize/localize.models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { StyledTx } from './tx.styled'
import { StyledTxProps } from './tx.models'

interface Props extends StyledTxProps {
  tx?: string | number;
  local?: keyof typeof Localization;
  children?: React.ReactNode;
}

export const Tx = ({ tx, local, children, ...styledTxProps }: Props) => {
  const localize = useLocalize()

  const getChildren = () => {
    if (children) {
      return children
    }

    const base = localize()[local as keyof typeof Localization] ?? tx
    return `${styledTxProps.prefix ?? ''}${base}${styledTxProps.suffix ?? ''}`
  }

  return (
    <StyledTx children={getChildren()} RTL={Boolean(localize().rtl)} {...styledTxProps} />
  )
}
