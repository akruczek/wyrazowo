import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { DictionarlyEndModalContainer, DictionarlyModalText } from './dictionarly-end-modal.styled'
import { useLocalize } from '@core/hooks/use-localize.hook';

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
  state: boolean | null;
}

export const DictionarlyEndModal = ({ modalizeRef, state }: Props) => {
  const localize = useLocalize()

  return (
    <Modalize ref={modalizeRef} adjustToContentHeight>
      <DictionarlyEndModalContainer>
        <DictionarlyModalText children={state ? localize().success : localize().failed} />
      </DictionarlyEndModalContainer>
    </Modalize>
  )
}
