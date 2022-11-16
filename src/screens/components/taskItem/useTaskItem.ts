import * as React from 'react';
import {Dimensions, LayoutRectangle} from 'react-native';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {useStartScreen} from '../../useStartScreen';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export const useTaskItem = (taskId: number) => {
  const {removeTask} = useStartScreen();
  const [listItemHeight, setListItemHeight] = React.useState(65);
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(listItemHeight);
  const marginBottom = useSharedValue(20);

  const findViewHeight = (layout: LayoutRectangle) => {
    const {height} = layout;
    setListItemHeight(height);
    return height;
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginBottom.value = withTiming(-10);
        runOnJS(removeTask)(taskId);
        return;
      }
      translateX.value = withTiming(0, {duration: 500});
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    height: itemHeight.value,
    marginBottom: marginBottom.value,
  }));

  return {
    reanimatedStyle,
    panGesture,
    findViewHeight,
  };
};
