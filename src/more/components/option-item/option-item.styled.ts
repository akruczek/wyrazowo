import styled from 'styled-components/native'

export const OptionItemTouchableOpacity = styled.TouchableOpacity.attrs(({ onPress }) => ({
  activeOpacity: Number(!onPress),
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 1000,
  },
}))``

export const OptionItemImage = styled.Image`
  width: ${50}px;
  height: ${50}px;
  border-radius: ${50 / 2}px;
`
