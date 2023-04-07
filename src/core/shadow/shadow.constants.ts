import { COLOR } from '../colors/colors.constants'

export const genericShadow = {
  shadowColor: COLOR.BLACK,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}

export const genericLightShadow = {
  shadowColor: COLOR.BLACK,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,
  elevation: 3,
}

export const genericTextShadow = {
  textShadowColor: COLOR.DIM_GREY,
  textShadowOffset: {
    width: -1,
    height: 1,
  },
  textShadowRadius: 10,
}
