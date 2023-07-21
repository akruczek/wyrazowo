import * as React from 'react'
import { genericTextShadow } from '@core/shadow/shadow.constants'
import { StyledTx } from './tx.styled'
import { StyledTxProps } from './tx.models'

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
