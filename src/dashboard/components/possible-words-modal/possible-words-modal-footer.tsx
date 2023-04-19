import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { PaddingView } from '@core/styled/padding-view.styled';
import { PossibleWordsModalFooterButton, PossibleWordsModalFooterButtonText } from './possible-words-modal.styled'

interface Props {
  onPress: () => void;
  isPending: boolean;
  maxReached: boolean;
}

export const PossibleWordsModalFooter = ({ onPress, isPending, maxReached }: Props) => {
  const localize = useLocalize()

  return maxReached ? null : (
    <PaddingView paddings={[ 0, 0, 30, 0 ]}>
      {isPending ? (
        <PossibleWordsModalFooterButton activeOpacity={1}>
          <ActivityIndicator size="small" />
        </PossibleWordsModalFooterButton>
      ) : (
        <PossibleWordsModalFooterButton onPress={onPress}>
          <PossibleWordsModalFooterButtonText children={`${localize().load_more}...`} />
        </PossibleWordsModalFooterButton>
      )}
    </PaddingView>
  )
}