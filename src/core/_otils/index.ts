import { _OR } from './models'
import { ifElse, toNumberFlag } from './boolean'
import { toNumber } from './string'
import { isE, compareJoined, filterByIndex, appendFirst, incl } from './array'
import { gt, gte, lt, lte, inc } from './number'
import { isNull, getTime, exist } from './generic'

const _o = <A>(arg?: A): _OR<A> => {
  const generic = {
    isNull: isNull(arg),
    exist: exist(arg),
    getTime,
  }

  // Boolean
  if (typeof arg === 'boolean') {
    return {
      ifElse: <T, F>(onTrue: T, onFalse: F) => ifElse(onTrue, onFalse, arg),
      toNumberFlag: toNumberFlag(arg),
      ...generic
    } as _OR<A>
  }

  if (typeof arg === 'string') {
    return {
      toNumber: toNumber(arg),
      ...generic,
    } as _OR<A>
  }

  // Array
  if (arg instanceof Array) {
    return {
      isE: isE<A>(arg),
      incl: <T>(item: T) => incl<T>(item, arg),
      compareJoined: <T>(array: T[]) => compareJoined<T, A>(array, arg),
      filterByIndex: (index: number) => filterByIndex<A>(index, arg),
      appendFirst: <T>(item: T) => appendFirst<T, A>(item, arg),
      ...generic,
    } as _OR<A>
  }

  // Number
  if (typeof arg === 'number') {
    return {
      gt: (value: number) => gt(value, arg),
      lt: (value: number) => lt(value, arg),
      gte: (value: number) => gte(value, arg),
      lte: (value: number) => lte(value, arg),
      inc: inc(arg),
      ...generic,
    } as _OR<A>
  }

  // Generic
  return generic as _OR<A>
}

export default _o

export const O = {
  ifElse, toNumberFlag,
  toNumber,
  isE, compareJoined, filterByIndex, appendFirst, incl,
  gt, gte, lt, lte, inc,
  isNull, getTime, exist,
}
