import { PlaygroundFieldModel } from './playground.models'

export enum PLAYGROUND_FIELD_TYPE {
  EMPTY = 'empty',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  RED = 'red',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  STAR = 'star',
}

const F_RED: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.RED,
}

const F_EMPTY: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.EMPTY,
}

const F_TRIPLE: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.TRIPLE,
}

const F_DOUBLE: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.DOUBLE,
}

const F_GREEN: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.GREEN,
}

const F_YELLOW: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.YELLOW,
}

const F_BLUE: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.BLUE,
}

const F_STAR: PlaygroundFieldModel = {
  type: PLAYGROUND_FIELD_TYPE.STAR,
}

export const PLAYGROUND_FIELDS: PlaygroundFieldModel[] = [
  F_RED, F_EMPTY, F_TRIPLE, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_RED, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_TRIPLE, F_EMPTY, F_RED,
  F_EMPTY, F_EMPTY, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_RED, F_EMPTY, F_RED, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_EMPTY, F_EMPTY,
  F_TRIPLE, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_TRIPLE,
  F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY,
  F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY,
  F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_BLUE, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN,
  F_EMPTY, F_RED, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_BLUE, F_EMPTY, F_BLUE, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_RED, F_EMPTY,
  F_RED, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_BLUE, F_EMPTY, F_STAR, F_EMPTY, F_BLUE, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_RED,
  F_EMPTY, F_RED, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_BLUE, F_EMPTY, F_BLUE, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_RED, F_EMPTY,
  F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_BLUE, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN,
  F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_EMPTY, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY,
  F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY,
  F_TRIPLE, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_DOUBLE, F_EMPTY, F_YELLOW, F_EMPTY, F_DOUBLE, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_TRIPLE,
  F_EMPTY, F_EMPTY, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_RED, F_EMPTY, F_RED, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_EMPTY, F_EMPTY,
  F_RED, F_EMPTY, F_TRIPLE, F_EMPTY, F_EMPTY, F_GREEN, F_EMPTY, F_RED, F_EMPTY, F_GREEN, F_EMPTY, F_EMPTY, F_TRIPLE, F_EMPTY, F_RED,
]
