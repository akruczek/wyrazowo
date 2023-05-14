import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { SCREEN } from '../../../navigation/navigation.constants'
import { EndModalButtonsContainer, EndModalContainer, EndModalTitle } from './end-modal.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
  success: boolean;
  word: string;
}

export const EndModal = ({ modalizeRef, success, word }: Props) => {
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  const handleTryAgain = () => {
    navigation.navigate(SCREEN.CHARADE_MAIN)
  }

  return (
    <Modalize ref={modalizeRef} adjustToContentHeight>
      <EndModalContainer>
        <EndModalTitle children={success ? localize().success : localize().failed} />
        <EndModalTitle children={word.toUpperCase()} />

        <EndModalButtonsContainer>
          <CustomButton color={COLOR.DARK_SEA_GREEN} onPress={handleTryAgain} title={localize().try_again} />
        </EndModalButtonsContainer>
      </EndModalContainer>
    </Modalize>
  )
}
