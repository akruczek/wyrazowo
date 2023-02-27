import * as R from 'ramda'
import { LETTERS_1, LETTERS_2, LETTERS_3, LETTERS_5 } from '../../core/letter-card/letter-card.constants'

const mapCharacterToPoint = R.cond([
  [ R.includes(R.__, LETTERS_1), R.always(1) ],
  [ R.includes(R.__, LETTERS_2), R.always(2) ],
  [ R.includes(R.__, LETTERS_3), R.always(3) ],
  [ R.includes(R.__, LETTERS_5), R.always(5) ],
  [ R.T, R.always(0) ],
])

export const getWordPoints = R.pipe<string[], string, string[], number[], number>(
  R.toUpper,
  R.split(''),
  R.map(mapCharacterToPoint),
  R.sum,
)
