import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import {
  PossibleWordsModalFooterButton,
  PossibleWordsModalFooterButtonText,
  PossibleWordsModalFooterContainer,
} from './possible-words-modal.styled'

interface Props {
  onPress: () => void;
  isPending: boolean;
  maxReached: boolean;
}

export const PossibleWordsModalFooter = ({ onPress, isPending, maxReached }: Props) => maxReached ? null : (
  <PossibleWordsModalFooterContainer>
    {isPending ? (
      <PossibleWordsModalFooterButton activeOpacity={1}>
        <ActivityIndicator size="small" />
      </PossibleWordsModalFooterButton>
    ) : (
      <PossibleWordsModalFooterButton onPress={onPress}>
        <PossibleWordsModalFooterButtonText children="Load more..." />
      </PossibleWordsModalFooterButton>
    )}
  </PossibleWordsModalFooterContainer>
)
