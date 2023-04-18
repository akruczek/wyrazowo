import { isE, compareJoined, filterByIndex, appendFirst, incl } from './array'
import { isNull, getTime } from './generic'
import { _OArray, _OGeneric, _ONumber, _OR } from './models'
import { gt, gte, lt, lte } from './number'

const _o = <A>(arg?: A): _OR<A> => {
  const generic: _OGeneric = {
    isNull: isNull(arg),
    getTime,
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
      ...generic,
    } as _OR<A>
  }

  // Generic
  return generic as _OR<A>
}

export default _o