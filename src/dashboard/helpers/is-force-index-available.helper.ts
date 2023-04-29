import * as R from 'ramda'
import { LETTER_SOAP } from '@core/letter-card/letter-card.constants'

export const isForceIndexAvailable = R.both(
  R.propEq('length', 1),
  R.complement(R.includes(LETTER_SOAP)),
)
