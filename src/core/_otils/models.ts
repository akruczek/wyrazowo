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
