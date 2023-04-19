import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@core/colors/colors.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { genericLightShadow } from '@core/shadow/shadow.constants'

interface Props {
  condition: boolean;
  icon: string;
  Wrapper: React.FunctionComponent<any>,
  onPress: () => void;
  getInitialY: () => number;
}

export const GestureLettersGridArrow = ({
  condition, icon, Wrapper, onPress, getInitialY,
}: Props) => condition ? null : (
  <Wrapper onPress={onPress} style={genericLightShadow} y={getInitialY()}>
    <MaterialCommunityIcons name={icon} color={COLOR.BLACK} size={RESPONSIVE.WIDTH(5)} />
  </Wrapper>
)
