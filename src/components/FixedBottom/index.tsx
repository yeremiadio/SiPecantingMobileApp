import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const FixedBottom = ({children, style}: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default FixedBottom;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 16,
    height: 80,
    flex: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    zIndex: 99,
  },
});
