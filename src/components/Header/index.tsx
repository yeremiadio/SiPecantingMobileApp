import {StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

type Props = {
  offsetValue: number;
  height: number;
  children: string | JSX.Element;
};

const Header = ({offsetValue, height, children}: Props) => {
  const theme = useTheme();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(offsetValue, [0, height / 1.5], [0, 1]),
    };
  });
  return (
    <Animated.View
      style={[
        styles.header,
        headerAnimatedStyle,
        {backgroundColor: theme.colors.surface},
      ]}>
      {children}
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'red',
  },
});
