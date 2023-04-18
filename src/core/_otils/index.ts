import { isE, compareJoined, filterByIndex, appendFirst, incl } from './array'
import { isNull, getTime } from './generic'
import { _OArray, _OGeneric } from './models'

type R<A> = A extends any[]
  ? (_OArray<A> & _OGeneric)
  : _OGeneric

const _o = <A>(arg?: A): R<A> => {
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
    } as R<A>
  }

  // Generic
  return generic as R<A>
}

export default _o
