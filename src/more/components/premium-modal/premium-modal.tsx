import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useDispatch } from 'react-redux'
import { premiumService } from '@core/premium-service/premium-service'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SpacingView } from '@core/styled'
import { CustomModalize } from '@core/custom-modalize/cutom-modalize'
import premiumCodes from '../../../assets/premium-codes.json'
import { PremiumModalButtonIcon, PremiumModalTextInput } from './premium-modal.styled'

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
      <CustomModalize reference={modalizeRef} adjustToContentHeight>
        <SpacingView spacings="0 0 XXL 0" type="padding">
          <PremiumModalTextInput
            placeholder={`${localize().enter_premium_code}...`}
            onChange={setPremiumCode}
            value={premiumCode}
            state={state}
          />

          <SpacingView spacings="L 0 0 0">
            <CustomButton onPress={applyPremiumCode} color={COLOR.DODGER_BLUE}>
              <PremiumModalButtonIcon />
            </CustomButton>
          </SpacingView>
        </SpacingView>
      </CustomModalize>
    </Portal>
  )
}
