import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import type { BottomSheetModal as BottomSheetModalType } from '@gorhom/bottom-sheet'
import { useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'

export type CustomModalizeRef = { open: () => void; close: () => void }

interface CustomModalizeProps extends Omit<BottomSheetModalProps, 'children'> {
  children: React.ReactNode;
  reference: React.MutableRefObject<CustomModalizeRef | null>;
  adjustToContentHeight?: boolean;
  modalStyle?: StyleProp<ViewStyle>;
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
  panGestureEnabled?: boolean;
  modalTopOffset?: number;
  disableScrollIfPossible?: boolean;
  avoidKeyboardLikeIOS?: boolean;
  useNativeDriver?: boolean;
  scrollViewProps?: object;
}

const DEFAULT_SNAP_POINTS = [ '90%' ]

export const CustomModalize = ({
  children,
  reference,
  adjustToContentHeight,
  modalStyle,
  onOpen,
  onOpened,
  onClose: onCloseProp,
  onClosed,
  panGestureEnabled = true,
  snapPoints: snapPointsProp,
  enableDynamicSizing: enableDynamicSizingProp,
  backgroundStyle: backgroundStyleProp,
  ...rest
}: CustomModalizeProps) => {
  const theme = useTheme() as ThemeModel
  const bottomSheetRef = React.useRef<BottomSheetModalType>(null)
  const isOpenRef = React.useRef(false)

  React.useEffect(() => {
    reference.current = {
      open: () => {
        onOpen?.()
        bottomSheetRef.current?.present()
      },
      close: () => {
        bottomSheetRef.current?.dismiss()
      },
    }

    return () => {
      reference.current = null
    }
  }, [ reference, onOpen ])

  const enableDynamicSizing = adjustToContentHeight ?? enableDynamicSizingProp ?? false
  const snapPoints = enableDynamicSizing ? undefined : (snapPointsProp ?? DEFAULT_SNAP_POINTS)

  const handleChange = (index: number) => {
    if (index >= 0 && !isOpenRef.current) {
      isOpenRef.current = true
      onOpened?.()
    }

    if (index === -1 && isOpenRef.current) {
      isOpenRef.current = false
      onCloseProp?.()
    }
  }

  const handleDismiss = () => {
    isOpenRef.current = false
    onClosed?.()
  }

  const backgroundStyle = [
    { backgroundColor: theme.backgroundPrimary },
    modalStyle,
    backgroundStyleProp,
  ]

  const renderBackdrop = React.useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    [],
  )

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing={enableDynamicSizing}
      snapPoints={snapPoints}
      enablePanDownToClose={panGestureEnabled}
      enableContentPanningGesture={panGestureEnabled}
      enableHandlePanningGesture={panGestureEnabled}
      onChange={handleChange}
      onDismiss={handleDismiss}
      backgroundStyle={backgroundStyle}
      backdropComponent={renderBackdrop}
      {...rest}
    >
      {enableDynamicSizing ? (
        <BottomSheetView>{children}</BottomSheetView>
      ) : children}
    </BottomSheetModal>
  )
}
