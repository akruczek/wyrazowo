interface RTLProps {
  RTL?: boolean;
}

/** Cast helpers as any so styled-components Interpolation accepts them under TypeScript 7. */
export const getRTLFlexDirection = (({ RTL }: RTLProps) =>
  RTL ? 'row-reverse' : 'row') as any

export const getRTLColumnAlignItems = (({ RTL }: RTLProps) =>
  RTL ? 'flex-end' : 'flex-start') as any

export const getRTLRotation = (({ RTL }: RTLProps) =>
  RTL ? 'transform: rotate(180deg);' : '') as any

export const getRTLTextAlignment = (({ RTL }: RTLProps) =>
  RTL ? 'right' : 'left') as any
