import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useModalTopOffset } from '@core/hooks/use-modal-top-offset.hook'
import { WordDetailsModalContainer } from './word-details-modal.styled'
import { WordDetailsHeadline } from './word-details-headline'
import { WordDetialsDefinitions } from './word-details-definitions'

interface Props {
  word: string | null;
  modalizeRef: React.MutableRefObject<any>;
}

export const WordDetailsModal = ({ modalizeRef, word }: Props) => {
  const modalOffset = useModalTopOffset()

  return (
    <Modalize ref={modalizeRef} modalTopOffset={modalOffset} avoidKeyboardLikeIOS useNativeDriver>
      {word ? (
        <WordDetailsModalContainer>
          <WordDetailsHeadline word={word} />
          <WordDetialsDefinitions word={word} />
        </WordDetailsModalContainer>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </Modalize>
  )
}
