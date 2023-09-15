export const getRTLFlexDirection = ({ RTL }: { RTL: boolean }) =>
  RTL ? 'row-reverse' : 'row'

export const getRTLColumnAlignItems = ({ RTL }: { RTL: boolean }) =>
  RTL ? 'flex-end' : 'flex-start'

export const getRTLRotation = ({ RTL }: { RTL: boolean }) =>
  RTL ? 'transform: rotate(180deg);' : ''
