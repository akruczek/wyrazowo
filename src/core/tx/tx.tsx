import * as React from 'react'
import { StyledTx, StyledTxProps } from './tx.styled'

interface Props extends StyledTxProps {
  tx?: string | number;
  children?: React.ReactNode;
}

export const Tx = ({ tx, children, ...styledTxProps }: Props) => {
  return (
    <StyledTx
      children={children ?? tx ?? ''}
      {...styledTxProps}
    />
  )
}
