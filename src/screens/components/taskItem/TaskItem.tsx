import {BlurView} from '@react-native-community/blur';
import * as React from 'react';
import {Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {styles} from './styles';
import {useTaskItem} from './useTaskItem';

interface TaskItemProps {
  title: string;
  description: string;
  taskId: number;
}

const AnimatedView = Animated.createAnimatedComponent(BlurView);

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  taskId,
}) => {
  const {reanimatedStyle, panGesture, findViewHeight} = useTaskItem(taskId);

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <AnimatedView
        style={[styles.wrapper, reanimatedStyle]}
        blurType="light"
        blurAmount={5}
        onLayout={event => {
          findViewHeight(event.nativeEvent.layout);
        }}
        reducedTransparencyFallbackColor="white">
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </AnimatedView>
    </PanGestureHandler>
  );
};
