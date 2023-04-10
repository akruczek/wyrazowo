import * as React from 'react'
import * as R from 'ramda'

export const useForceUpdate = (): () => void => {
  const [ _, setState ] = React.useState(0)

  const forceUpdate = () => {
    setState(R.inc)
  }

  return forceUpdate
}