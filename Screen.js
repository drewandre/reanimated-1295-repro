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
  View,
  StyleSheet
} from 'react-native';
import React from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Box } from './Box';

const {
  width: windowWidth,
  height: windowHeight
} = Dimensions.get('window')

console.log(windowHeight)

const boxWidth = (windowWidth / 3)

const box1LayoutConfig = {
  maxWidth: windowWidth * 0.9,
  maxHeight: windowHeight * 0.5,
  height: 200,
  width: boxWidth,
  x: 0,
  y: windowHeight - 250,
}

const box2LayoutConfig = {
  maxWidth: windowWidth * 0.9,
  maxHeight: windowHeight * 0.5,
  height: 200,
  width: boxWidth,
  x: boxWidth,
  y: windowHeight - 250,
}

const box3LayoutConfig = {
  maxWidth: windowWidth * 0.9,
  maxHeight: windowHeight * 0.5,
  height: 200,
  width: boxWidth,
  x: boxWidth * 2,
  y: windowHeight - 250,
}

const withTimingConfig = {
  // duration: 500,
  // easing: Easing.bezier(0.5, 0.01, 0, 1),
}

export default function AnimatedStyleUpdateExample(props) {
  const progress = useSharedValue(0)
  const activeModuleId = useSharedValue(null)

  // const moduleWidthOffset = layoutConfig.maxWidth - layoutConfig.width
  // const moduleWidth = useDerivedValue(() => {
  //   return layoutConfig.width + (moduleWidthOffset * progress.value)
  // })

  // const moduleHeightOffset = layoutConfig.maxHeight - layoutConfig.height
  // const moduleHeight = useDerivedValue(() => {
  //   return layoutConfig.height + (moduleHeightOffset * progress.value)
  // })

  // const translateXOffset = (windowWidth - layoutConfig.maxWidth) * 0.5
  // const translateX = useDerivedValue(() => {
  //   return -layoutConfig.pageX + translateXOffset
  // })

  // const translateYOffset = (windowHeight - layoutConfig.maxHeight) * 0.5
  // const translateY = useDerivedValue(() => {
  //   return -layoutConfig.pageY + translateYOffset
  // })


  // const animatedBoxStyles = useAnimatedStyle(() => {
  //   return {
  //     width: moduleWidth.value,
  //     height: moduleHeight.value,
  //     zIndex: progress.value > 0 ? 9999 : 0,
  //     backgroundColor: 'rgba(255, 0, 0, 1)',
  //     transform: [
  //       { translateX: translateX.value * progress.value },
  //       { translateY: translateY.value * progress.value },
  //       // { scale: moduleScale.value }
  //     ]
  //   };
  // });

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      // zIndex: progress.value > 0 ? 9997 : 5,
    }
  })

  const closeContainerStyles = useAnimatedStyle(() => {
    return {
      width: progress.value > 0 ? windowWidth : 0,
      height: progress.value > 0 ? windowHeight : 0,
      opacity: progress.value
      // zIndex: progress.value > 0 ? 9997 : 5,
    }
  })

  const onModuleCloseGestureHandler = useAnimatedGestureHandler({
    onActive: () => {
      // activeModuleId.value = null
      progress.value = withSpring(0, withTimingConfig)
    },
  })

  return (
    <Animated.View style={[styles.container, animatedContainerStyles]}>
      <Box
        id={1}
        activeModuleId={activeModuleId}
        progress={progress}
        position={box1LayoutConfig}
      >
        <View style={[styles.boxChildren, { backgroundColor: 'red' }]}>
          <Text style={styles.text}>Box 1</Text>
        </View>
      </Box>
      <Box
        id={2}
        activeModuleId={activeModuleId}
        progress={progress}
        position={box2LayoutConfig}
      >
        <View style={[styles.boxChildren, { backgroundColor: 'green' }]}>
          <Text style={styles.text}>Box 2</Text>
        </View>
      </Box>
      <Box
        id={3}
        activeModuleId={activeModuleId}
        progress={progress}
        position={box3LayoutConfig}
      >
        <View style={[styles.boxChildren, { backgroundColor: 'blue' }]}>
          <Text style={styles.text}>Box 3</Text>
        </View>
      </Box>
      <TapGestureHandler
        maxDist={10}
        onHandlerStateChange={onModuleCloseGestureHandler}>
        <Animated.View style={[styles.closeContainer, closeContainerStyles]} />
      </TapGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxChildren: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff'
  },
  closeContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})