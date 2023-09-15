interface RTLProps {
  RTL: boolean;
}

export const getRTLFlexDirection = ({ RTL }: RTLProps) =>
  RTL ? 'row-reverse' : 'row'

export const getRTLColumnAlignItems = ({ RTL }: RTLProps) =>
  RTL ? 'flex-end' : 'flex-start'

export const getRTLRotation = ({ RTL }: RTLProps) =>
  RTL ? 'transform: rotate(180deg);' : ''

export const getRTLTextAlignment = ({ RTL }: RTLProps) =>
  RTL ? 'right' : 'left'
