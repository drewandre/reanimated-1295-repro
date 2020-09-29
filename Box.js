import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  Easing,
} from 'react-native-reanimated';
import {
  Dimensions,
  Text,
  StyleSheet
} from 'react-native';
import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';

const {
  width: windowWidth,
  height: windowHeight
} = Dimensions.get('window')

const withTimingConfig = {
  // duration: 500,
  // easing: Easing.bezier(0.5, 0.01, 0, 1),
}

export function Box({
  id,
  position: {
    maxWidth = windowWidth * 0.9,
    maxHeight = windowHeight * 0.5,
    height,
    width,
    x,
    y
  },
  progress,
  activeModuleId,
  children
}) {

  function calculateProgress(p) {
    'worklet';
    if (activeModuleId.value === id || activeModuleId.value === null) {
      return p
    } else {
      return 0
    }
  }

  function calculateOpacity(p) {
    'worklet';
    if (activeModuleId.value === id || activeModuleId.value === null) {
      return 1
    } else {
      return 1 - p
    }
  }

  function calculateZ() {
    'worklet';
    if (activeModuleId.value === id || activeModuleId.value === null) {
      return 9999
    } else {
      return 0
    }
  }

  const moduleWidthOffset = maxWidth - width
  const moduleWidth = useDerivedValue(() => width + calculateProgress(moduleWidthOffset * progress.value))

  const moduleHeightOffset = maxHeight - height
  const moduleHeight = useDerivedValue(() => height + calculateProgress(moduleHeightOffset * progress.value))

  const translateXOffset = -x + (windowWidth - maxWidth) * 0.5
  const translateX = useDerivedValue(() => calculateProgress(translateXOffset * progress.value))

  const translateYOffset = -y + (windowHeight - maxHeight) * 0.5
  const translateY = useDerivedValue(() => calculateProgress(translateYOffset * progress.value))

  const animatedBoxStyles = useAnimatedStyle(() => ({
    top: y,
    left: x,
    width: moduleWidth.value,
    height: moduleHeight.value,
    zIndex: calculateZ(progress.value),
    opacity: calculateOpacity(progress.value),
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ]
  }))

  const onModuleTapGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      activeModuleId.value = id
      progress.value = withSpring(1, withTimingConfig)
    },
  })

  return (
    <TapGestureHandler onGestureEvent={onModuleTapGestureHandler}>
      <Animated.View style={[styles.box, animatedBoxStyles]}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: 'absolute',
    borderRadius: 29,
    margin: 0,
  },
  text: {
    color: '#fff'
  },
  closeContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})