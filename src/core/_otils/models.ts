export interface _OArray<A> {
  isE: boolean;
  incl: <T>(item: T) => boolean;
  compareJoined: <T>(item: T) => boolean;
  filterByIndex: (index: number) => A | undefined;
  appendFirst: <T>(item: T) => (A | T)[];
}

export interface _OGeneric {
  isNull: boolean;
  getTime: () => number;
}

export interface _ONumber<A> {
  gt: (value: number) => boolean;
  lt: (value: number) => boolean;
  gte: (value: number) => boolean;
  lte: (value: number) => boolean;
}

export type _OR<A> = A extends any[]
  ? (_OArray<A> & _OGeneric)
  : A extends number
    ? (_ONumber<A> & _OGeneric)
    : _OGeneric
