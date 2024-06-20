import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from 'react-native-paper';

type Props = {
  children: ReactNode;
};

const FixedBottom = ({children}: Props) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {borderColor: theme.colors.surfaceVariant}]}>
      {children}
    </View>
  );
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
  },
});
