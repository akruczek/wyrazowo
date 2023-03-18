import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'
import { WordDetailsModalContainer } from './word-details-modal.styled'
import { WordDetailsHeadline } from './word-details-headline'
import { WordDetialsDefinitions } from './word-details-definitions'

interface Props {
  word: string | null;
  modalizeRef: React.MutableRefObject<any>;
  topInset: number;
}

export const WordDetailsModal = ({ modalizeRef, word, topInset }: Props) => {
  const modalTopOffset = topInset + BOTTOM_NAVIGATION_HEIGHT + 30

  return (
    <Modalize ref={modalizeRef} modalTopOffset={modalTopOffset} avoidKeyboardLikeIOS useNativeDriver>
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
