import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, TextInput, TextInputProps, useTheme} from 'react-native-paper';

type Props = {
  isLabelFloating?: boolean;
  helperText?: string;
} & TextInputProps;

const InputText = ({
  label,
  helperText,
  isLabelFloating = true,
  error,
  ...rest
}: Props) => {
  const {
    colors: {error: errorColor},
  } = useTheme();
  return (
    <View style={styles.container}>
      {label && !isLabelFloating ? (
        <Text style={styles.label} variant="bodyLarge">
          {label}
        </Text>
      ) : null}
      <TextInput
        {...rest}
        label={isLabelFloating ? label : undefined}
        theme={{roundness: 6}}
        error={error}
      />
      {helperText ? (
        <Text
          style={[styles.helperText, {color: error ? errorColor : undefined}]}
          variant="bodySmall">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {marginVertical: 8},
  label: {
    marginBottom: 4,
  },
  helperText: {
    marginTop: 6,
  },
});
