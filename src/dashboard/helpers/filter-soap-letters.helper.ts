import * as R from 'ramda'
import { LETTER_EMPTY, LETTER_SOAP } from '@core/letter-card/letter-card.constants'

export const filterSoapLetters = R.map(
  R.when(
    R.equals(LETTER_SOAP),
    R.always(LETTER_EMPTY),
  )
)
