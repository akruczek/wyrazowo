import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import {
  DictionarlyEndModalButtonsContainer, DictionarlyEndModalContainer, DictionarlyModalLabel, DictionarlyModalText,
} from './dictionarly-end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
  state: boolean | null;
  word: string;
}

export const DictionarlyEndModal = ({ modalizeRef, state, word }: Props) => {
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  return (
    <Modalize ref={modalizeRef} adjustToContentHeight>
      <DictionarlyEndModalContainer>
        <DictionarlyModalText children={state ? localize().success : localize().failed} />
        <DictionarlyModalLabel state={state} children={word} />

        <DictionarlyEndModalButtonsContainer>
          <CustomButton color={COLOR.DODGER_BLUE} onPress={navigation.goBack} title={localize().try_again} />
        </DictionarlyEndModalButtonsContainer>
      </DictionarlyEndModalContainer>
    </Modalize>
  )
}
