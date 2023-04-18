export interface _OBoolean<A> {
  /**
  * Returns first argument if given condition in truthy, second argument otherwise
  * @example
  * ```typescript
  * _o('soap'.length === 4).ifElse('YES', 'NO') //=> 'YES'
  * _o(typeof 'soap' === 'number').ifElse(1, 0) //=> 0
  * ```
  */
  ifElse: <T, F>(onTrue: T, onFalse: F) => T | F;
}

export interface _OArray<A> {
  /**
   * Equals true when given array is empty (length: 0), false otherwise
   * @example
   * ```typescript
   * _o([]).isE        //=> true
   * _o([ 1, 2 ]).isE  //=> false
   * ```
   */
  isE: boolean;

  /**
   * Returns true when given array contains given item, false otherwise
   * @example
   * ```typescript
   * _o([ 'soap', 'S', 'SOAP' ]).incl('SOAP') //=> true
   * _o([ 'soap', 'S', 'SOAP' ]).incl('s')    //=> false
   * ```
   */
  incl: <T>(item: T) => boolean;

  /**
   * Returns true when given arrays values are equal, false otherwise
   * @example
   * ```typescript
   * _o([ 'x', 'C', 'l' ]).compareJoined([ 'x', 'C', 'l' ]) //=> true
   * _o([ 'x', 'C', 'l' ]).compareJoined([ 'x', 'c', 'l' ]) //=> false
   * ```
   */
  compareJoined: <T>(item: T) => boolean;

  /**
   * Returns given array without element with given index
   * @example
   * ```typescript
   * _o([ 'x', 'y', 'z' ]).filterByIndex(1) //=> [ 'x', 'z' ]
   * ```
   */
  filterByIndex: (index: number) => A[];

  /**
   * Returns given array with additional given element at the beginning of array (index: 0)
   * @example
   * ```typescript
   * _o([ 1, 2, 3 ]).appendFirst(4) //=> [ 4, 1, 2, 3 ]
   * ```
   */
  appendFirst: <T>(item: T) => (A | T)[];
}

export interface _ONumber<A> {
  /**
  * Returns true if given argument is greater than the second, false otherwise
  * @example
  * ```typescript
  * _o(3).gt(3) //=> false
  * _o(4).gt(3) //=> true
  * ```
  */
  gt: (value: number) => boolean;

  /**
  * Returns true if given argument is less than the second, false otherwise
  * @example
  * ```typescript
  * _o(3).lt(2) //=> false
  * _o(3).lt(3) //=> false
  * _o(3).lt(4) //=> true
  * ```
  */
  lt: (value: number) => boolean;

  /**
  * Returns true if given argument is greater than or equal to the second, false otherwise
  * @example
  * ```typescript
  * _o(3).gte(3) //=> true
  * _o(3).gte(2) //=> true
  * _o(2).gte(3) //=> false
  * ```
  */
  gte: (value: number) => boolean;

  /**
  * Returns true if given argument is less than or equal the second, false otherwise
  * @example
  * ```typescript
  * _o(3).lte(3) //=> true
  * _o(3).lte(2) //=> true
  * _o(3).lte(4) //=> false
  * ```
  */
  lte: (value: number) => boolean;

  /**
  * Equals given argument incremented by 1
  * @example
  * ```typescript
  * _o(3).inc //=> 4
  * _o(0).inc //=> 1
  * ```
  */
  inc: number;
}

export interface _OGeneric {
  /**
  * Equals true when given argument equals null, false otherwise
  * @example
  * ```typescript
  * _o(null).isNull        //=> true
  * _o(undefined).isNull   //=> false
  * _o(NaN).isNull         //=> false
  * _o(0).isNull           //=> false
  * ```
  */
  isNull: boolean;

  /**
  * Returns current time in milliseconds
  * @example
  * ```typescript
  * _o().getTime() //=> 1681819898021
  * ```
  */
  getTime: () => number;
}

export type _OR<A> = A extends boolean
  ? (_OBoolean<A> & _OGeneric)
  : A extends any[]
    ? (_OArray<A> & _OGeneric)
    : A extends number
      ? (_ONumber<A> & _OGeneric)
      : _OGeneric
