import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useDispatch } from 'react-redux'
import premiumCodes from '../../../assets/premium-codes.json'
import { premiumService } from '../../../core/premium-service/premium-service'
import { CustomButton } from '../../../core/custom-button/custom-button'
import { COLOR } from '../../../core/colors/colors.constants'
import { useLocalize } from '../../../core/hooks/use-localize.hook'
import { PremiumModalButtonIcon, PremiumModalContainer, PremiumModalTextInput } from './premium-modal.styled'
import { MarginView } from '../../../core/styled/margin-view.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize | null>;
}

export const PremiumModal = ({ modalizeRef }: Props) => {
  const localize = useLocalize()
  const dispatch = useDispatch()
  const [ premiumCode, setPremiumCode ] = React.useState('')
  const [ state, setState ] = React.useState<boolean | null>(null)

  const applyPremiumCode = () => {
    if ((premiumCodes ?? []).includes(premiumCode)) {
      modalizeRef?.current?.close?.()

      setTimeout(() => {
        setState(null)
        setPremiumCode('')
        premiumService.activateOnce(dispatch)
      })
    } else {
      setState(false)
    }
  }

  return (
    <Portal>
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <PremiumModalContainer>
          <PremiumModalTextInput
            placeholder={`${localize().enter_premium_code}...`}
            onChange={setPremiumCode}
            value={premiumCode}
            state={state}
          />

          <MarginView margins={[ 20, 0, 0, 0 ]}>
            <CustomButton onPress={applyPremiumCode} color={COLOR.DODGER_BLUE}>
              <PremiumModalButtonIcon />
            </CustomButton>
          </MarginView>
        </PremiumModalContainer>
      </Modalize>
    </Portal>
  )
}
