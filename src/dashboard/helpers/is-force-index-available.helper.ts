import * as R from 'ramda'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP } from '@core/letter-card/letter-card.constants'

export const isForceIndexAvailable = R.both(
  R.either(R.propEq('length', 1), R.includes(LETTER_INDEX_SEPARATOR)),
  R.complement(R.includes(LETTER_SOAP)),
)
