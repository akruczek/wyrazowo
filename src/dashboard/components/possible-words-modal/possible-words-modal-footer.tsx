import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SpacingView } from '@core/styled'
import { Tx } from '@core/tx'
import { PossibleWordsModalFooterButton } from './possible-words-modal.styled'

interface Props {
  onPress: () => void;
  isPending: boolean;
  maxReached: boolean;
}

export const PossibleWordsModalFooter = ({ onPress, isPending, maxReached }: Props) => {
  const localize = useLocalize()

  return maxReached ? null : (
    <SpacingView spacings="0 0 XL 0" type="padding">
      {isPending ? (
        <PossibleWordsModalFooterButton activeOpacity={1}>
          <ActivityIndicator size="small" />
        </PossibleWordsModalFooterButton>
      ) : (
        <PossibleWordsModalFooterButton onPress={onPress}>
          <Tx tx={`${localize().load_more}...`} S link />
        </PossibleWordsModalFooterButton>
      )}
    </SpacingView>
  )
}