import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
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

export const PossibleWordsModalFooter = ({ onPress, isPending, maxReached }: Props) => {
  const localize = useLocalize()

  return maxReached ? null : (
    <PossibleWordsModalFooterContainer>
      {isPending ? (
        <PossibleWordsModalFooterButton activeOpacity={1}>
          <ActivityIndicator size="small" />
        </PossibleWordsModalFooterButton>
      ) : (
        <PossibleWordsModalFooterButton onPress={onPress}>
          <PossibleWordsModalFooterButtonText children={`${localize().load_more}...`} />
        </PossibleWordsModalFooterButton>
      )}
    </PossibleWordsModalFooterContainer>
  )
}